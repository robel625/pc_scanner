# Generated by Django 5.0 on 2024-01-07 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('security', '0009_device_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='check',
            name='barcode',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
