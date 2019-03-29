from django.db.models import Sum
from djmoney.contrib.django_rest_framework import MoneyField
from moneyed import CURRENCIES, DEFAULT_CURRENCY_CODE
from rest_framework import serializers

from vitek.models import Transaction, Place, OutcomeTransaction, Tag


class PlaceSerializer(serializers.ModelSerializer):
    start_balance = MoneyField(max_digits=10, decimal_places=2)
    balance = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = ['id', 'name', 'start_balance', 'start_balance_currency', 'balance']

    def get_balance_from(self, obj):
        return {data['amount_from_currency']: data['amount_from__sum'] for data in
                obj.transfers_from.filter(deleted=False).values('amount_from_currency').annotate(Sum('amount_from'))}

    def get_balance_to(self, obj):
        return {data['amount_to_currency']: data['amount_to__sum'] for data in
                obj.transfers_to.filter(deleted=False).values('amount_to_currency').annotate(Sum('amount_to'))}

    def get_balance(self, obj):
        balance_from = self.get_balance_from(obj)
        balance_to = self.get_balance_to(obj)
        balance = {key: balance_to.get(key, 0) - balance_from.get(key, 0) for key in
                   set(balance_from.keys()) | set(balance_to.keys())}
        balance[obj.start_balance.currency.code] = balance.get(obj.start_balance.currency.code, 0) + obj.start_balance.amount
        return balance


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    place_to = PlaceSerializer(read_only=True)
    place_from = PlaceSerializer(read_only=True)
    tags = TagSerializer(many=True)

    class Meta:
        model = Transaction
        fields = '__all__'


class OutcomeTransactionSerializer(serializers.ModelSerializer):
    amount_from = MoneyField(max_digits=10, decimal_places=2)
    amount_from_currency = serializers.ChoiceField(choices=CURRENCIES, default=DEFAULT_CURRENCY_CODE)

    class Meta:
        model = OutcomeTransaction
        fields = ['place_from', 'amount_from', 'amount_from_currency', 'created_by']


class IncomeTransactionSerializer(serializers.ModelSerializer):
    amount_to = MoneyField(max_digits=10, decimal_places=2)
    amount_to_currency = serializers.ChoiceField(choices=CURRENCIES, default=DEFAULT_CURRENCY_CODE)

    class Meta:
        model = OutcomeTransaction
        fields = ['place_to', 'amount_to', 'amount_to_currency', 'created_by']


class TransferTransactionSerializer(serializers.ModelSerializer):
    amount_from = MoneyField(max_digits=10, decimal_places=2)
    amount_from_currency = serializers.ChoiceField(choices=CURRENCIES, default=DEFAULT_CURRENCY_CODE)
    amount_to = MoneyField(max_digits=10, decimal_places=2)
    amount_to_currency = serializers.ChoiceField(choices=CURRENCIES, default=DEFAULT_CURRENCY_CODE)

    class Meta:
        model = OutcomeTransaction
        fields = ['place_from', 'amount_from', 'amount_from_currency', 'place_to', 'amount_to', 'amount_to_currency', 'created_by']

