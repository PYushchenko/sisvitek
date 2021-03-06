# Generated by Django 2.1.4 on 2019-04-29 12:01

from django.db import migrations, models
import djmoney.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('vitek', '0010_auto_20190411_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='startbalance',
            name='balance_currency',
            field=djmoney.models.fields.CurrencyField(choices=[('EUR', 'Euro'), ('RUB', 'Russian Ruble'), ('USD', 'US Dollar')], default='RUB', editable=False, max_length=3),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='amount_from_currency',
            field=djmoney.models.fields.CurrencyField(choices=[('EUR', 'Euro'), ('RUB', 'Russian Ruble'), ('USD', 'US Dollar')], default='RUB', editable=False, max_length=3),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='amount_to_currency',
            field=djmoney.models.fields.CurrencyField(choices=[('EUR', 'Euro'), ('RUB', 'Russian Ruble'), ('USD', 'US Dollar')], default='RUB', editable=False, max_length=3),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateTimeField(auto_created=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='deleted',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='ExchangeTransaction',
        ),
        migrations.DeleteModel(
            name='IncomeTransaction',
        ),
        migrations.DeleteModel(
            name='OutcomeTransaction',
        ),
        migrations.DeleteModel(
            name='TransferTransaction',
        ),
    ]
