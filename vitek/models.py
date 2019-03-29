from django.utils import timezone

from django.contrib.auth.models import User
from django.db import models
from djmoney.models.fields import MoneyField


class Place(models.Model):
    """ General place to sore funds """
    name = models.CharField(max_length=64)
    start_balance = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB')

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
    date = models.DateTimeField(auto_created=True, blank=True)
    place_from = models.ForeignKey(Place, on_delete=models.PROTECT, related_name='transfers_from', blank=True, null=True)
    amount_from = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB', blank=True)
    place_to = models.ForeignKey(Place, on_delete=models.PROTECT, related_name='transfers_to', blank=True, null=True)
    amount_to = MoneyField(max_digits=14, decimal_places=2, default_currency='RUB', blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=512, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    deleted = models.BooleanField()
    created_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super().save(*args, **kwargs)


class TransferTransaction(Transaction):
    """
    Transaction for transfer operation
    Used fields:
    place_to
    amount_to
    place_from
    amount_from
    """
    pass


class ExchangeTransaction(Transaction):
    """
    Transaction for transfer operation
    Used fields:
    place_to
    amount_to
    place_from
    amount_from
    """
    pass


class IncomeTransaction(Transaction):
    """
    Transaction for income operation
    Used fields:
    place_to
    amount_to
    """
    pass


class OutcomeTransaction(Transaction):
    """
    Transaction for income operation
    Used fields:
    place_from
    amount_from
    """
    pass
