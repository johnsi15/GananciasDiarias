# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_auto_20151002_2254'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfiles',
            name='activation_key',
            field=models.CharField(max_length=40, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='perfiles',
            name='date_key_expires',
            field=models.DateTimeField(default=datetime.date(2015, 11, 12)),
            preserve_default=True,
        ),
    ]
