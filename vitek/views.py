import collections

import pandas as pd
from django.db.models import Sum, F, Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from djmoney.contrib.django_rest_framework import MoneyField
from djmoney.contrib.exchange.models import convert_money
from moneyed import Money
from rest_framework import viewsets, mixins
from rest_framework import serializers as drf_serializers
from rest_framework.response import Response
from rest_framework.utils import json
from rest_framework.views import APIView

from vitek import serializers
from vitek.models import Transaction, Place, Tag

from .permissions import ReadOnly


def index(request):
    context = {}
    return render(request, 'index.html', context)


def test(request):
    balance_from = [Money(data['amount_from__sum'], data['amount_from_currency']) for data in
                    Transaction.objects.filter(place_from=2).values('amount_from_currency').annotate(
                        Sum('amount_from'))]
    balance_to = Transaction.objects.filter(place_to=2).all().aggregate(Sum('amount_to'))['amount_to__sum'] or 0
    context = {'balance_from': balance_from, 'balance_to': balance_to,
               'total': 0}
    return JsonResponse(context, safe=False)


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides basic CRUD functions for the Transaction model
    """
    queryset = Transaction.objects.filter(deleted=False).all().order_by('-date')
    serializer_class = serializers.TransactionSerializer
    permission_classes = (ReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('category', 'tags')

    # Uncomment for total of selected transactions
    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(queryset, many=True)
    #
    #     total_from = Money(0, "RUB")
    #     for d in queryset:
    #         total_from += convert_money(d.amount_from, "RUB")
    #
    #     custom_data = {
    #         'transactions': serializer.data
    #     }
    #
    #     custom_data.update({'total': total_from.amount})
    #     return Response(custom_data)


class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = serializers.PlaceSerializer
    permission_classes = (ReadOnly,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        counter = collections.Counter()
        for d in serializer.data:
            counter.update(d['balance'])

        custom_data = {
            'places': serializer.data
        }
        total_rub = Money(0, "RUB")
        for t in counter:
            total_rub += convert_money(Money(counter[t], t), "RUB")

        custom_data.update({'total': counter, 'total_rub': total_rub.amount})
        return Response(custom_data)


class TagsTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer


def convert(x):
    y = convert_money(Money(x.amount, x.currency), 'RUB', x.date).amount
    return y


class PayoutsChartNewView(APIView):
    @staticmethod
    def generate_total():
        aggregate_df = []
        aggregate_df_rub = []

        transactions = Transaction.objects.order_by('date')

        transactions_list = [{'date': x.date, 'amount': (x.amount_to_rub - x.amount_from_rub).amount} for x in
                             transactions]

        df = pd.DataFrame(transactions_list)
        df.index = df['date']

        df['amount'] = pd.to_numeric(df['amount'])

        df_amount = df.amount.resample('H').cumsum().fillna(method='ffill').resample('D').min()
        aggregate_df += [df_amount]

        full_df = pd.concat(aggregate_df, axis=1).ffill()
        full_df['total'] = full_df.sum(axis=1)
        aggregate_df = [full_df]
        full_df = pd.concat(aggregate_df, axis=1)
        full_df['rate'] = full_df['total'].diff()

        return full_df

    def get(self, request, format=None):
        # print(convert_money(Money(1, 'ETH'), 'USD', date='2017-09-01'))

        return Response(json.loads(self.generate_total().to_json(orient='split', date_format='iso')))


class CategoryReport(object):
    def __init__(self, category, amount):
        self.category = category
        self.amount = amount


class CategoryReportSerializer(drf_serializers.Serializer):
    category = serializers.CategorySerializer()
    amount = MoneyField(max_digits=10, decimal_places=2)


class CategoryChartView(APIView):
    @staticmethod
    def generate_report(tags):
        transactions = Transaction.objects
        if tags:
            transactions = transactions.filter(tags__in=tags)
        transactions = transactions.filter(Q(place_from__isnull=False) & Q(place_to__isnull=True))

        report = {}

        for transaction in transactions:
            report[transaction.category] = report.get(transaction.category,
                                                      Money(0, "RUB")) + transaction.amount_from_rub
        categories = []
        for key, value in report.items():
            categories.append(CategoryReport(key, value))

        categories.sort(key=lambda x: x.amount, reverse=True)

        return CategoryReportSerializer(categories, many=True).data

    def get(self, request, format=None):
        tags = request.GET.getlist('tags')
        return Response(self.generate_report(tags))
