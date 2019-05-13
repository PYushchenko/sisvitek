from django.contrib import admin
from .models import Place, PersonPlace, \
    Category, Tag, Transaction, StartBalance  # this line added

admin.site.register(Place)
admin.site.register(PersonPlace)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(StartBalance)


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('date', 'place_from', 'amount_from', 'place_to', 'amount_to', 'category', 'description')


