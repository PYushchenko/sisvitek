from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models
from djmoney.contrib.exchange.models import convert_money
from djmoney.models.fields import MoneyField


class StartBalance(models.Model):
    balance = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB')

    def __str__(self):
        return str(self.balance.amount) + " " + self.balance.currency.code

class Place(models.Model):
    """ General place to sore funds """
    name = models.CharField(max_length=64)
    start_balances = models.ManyToManyField(StartBalance)

    def __str__(self):
        return self.name


class PersonPlace(Place):
    """ Place for funds of person credit/debit """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=64)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    date = models.DateTimeField(auto_created=True, blank=False)
    place_from = models.ForeignKey(Place, on_delete=models.PROTECT, related_name='transfers_from', blank=True, null=True)
    amount_from = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB', blank=True)
    place_to = models.ForeignKey(Place, on_delete=models.PROTECT, related_name='transfers_to', blank=True, null=True)
    amount_to = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB', blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=512, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField(editable=False)

    @property
    def amount_from_rub(self):
        return convert_money(self.amount_from, 'RUB')

    @property
    def amount_to_rub(self):
        return convert_money(self.amount_to, 'RUB')

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super().save(*args, **kwargs)

