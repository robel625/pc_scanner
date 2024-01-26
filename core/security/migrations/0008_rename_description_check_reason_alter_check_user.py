# Generated by Django 5.0 on 2024-01-07 12:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('security', '0007_alter_device_thumbnail'),
    ]

    operations = [
        migrations.RenameField(
            model_name='check',
            old_name='description',
            new_name='reason',
        ),
        migrations.AlterField(
            model_name='check',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]