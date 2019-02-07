from django.db.models import Sum
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django_filters.rest_framework import DjangoFilterBackend
from moneyed import Money
from rest_framework import viewsets, mixins

from vitek import serializers
from vitek.models import Transaction, Place, OutcomeTransaction, IncomeTransaction, TransferTransaction, Tag

from .permissions import ReadOnly


def index(request):
    context = {}
    return render(request, 'index.html', context)


def test(request):
    balance_from = [Money(data['amount_from__sum'], data['amount_from_currency']) for data in
                    Transaction.objects.filter(place_from=2).values('amount_from_currency').annotate(Sum('amount_from'))]
    balance_to = Transaction.objects.filter(place_to=2).all().aggregate(Sum('amount_to'))['amount_to__sum'] or 0
    context = {'balance_from': balance_from, 'balance_to': balance_to,
               'total': 0}
    return JsonResponse(context, safe=False)


class TransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Provides basic CRUD functions for the Transaction model
    """
    queryset = Transaction.objects.all().order_by('date')
    serializer_class = serializers.TransactionSerializer
    permission_classes = (ReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('category', 'tags')



class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Place.objects.all()
    serializer_class = serializers.PlaceSerializer
    permission_classes = (ReadOnly,)


class OutcomeTransactionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = OutcomeTransaction.objects.all()
    serializer_class = serializers.OutcomeTransactionSerializer


class IncomeTransactionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = IncomeTransaction.objects.all()
    serializer_class = serializers.IncomeTransactionSerializer


class TransferTransactionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = TransferTransaction.objects.all()
    serializer_class = serializers.TransferTransactionSerializer


class TagsTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
