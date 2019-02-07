from django.contrib import admin
from .models import Place, IncomeTransaction, OutcomeTransaction, PersonPlace, TransferTransaction, \
    ExchangeTransaction, Category, Tag, Transaction  # this line added

admin.site.register(IncomeTransaction)
admin.site.register(OutcomeTransaction)
admin.site.register(TransferTransaction)
admin.site.register(ExchangeTransaction)
admin.site.register(Place)
admin.site.register(PersonPlace)
admin.site.register(Category)
admin.site.register(Tag)


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date', 'place_from', 'amount_from', 'place_to', 'amount_to', 'description')


