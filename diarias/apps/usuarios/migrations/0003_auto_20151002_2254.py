# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_auto_20150930_0913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='perfiles',
            name='correo',
            field=models.EmailField(max_length=70),
            preserve_default=True,
        ),
    ]
