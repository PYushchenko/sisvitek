# Generated by Django 2.1.4 on 2019-03-29 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vitek', '0007_auto_20190116_1426'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='deleted',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='transaction',
            name='date',
            field=models.DateTimeField(auto_created=True, blank=True),
        ),
    ]