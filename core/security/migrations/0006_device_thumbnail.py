# Generated by Django 5.0 on 2024-01-06 19:57

import security.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('security', '0005_rename_brand_device_model'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='thumbnail',
            field=models.ImageField(blank=True, null=True, upload_to=security.models.upload_thumbnail),
        ),
    ]
