# Generated by Django 2.1.4 on 2019-01-16 12:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vitek', '0005_auto_20190111_0811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
