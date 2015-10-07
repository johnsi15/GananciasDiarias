# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notas',
            name='titulo',
            field=models.CharField(max_length=50, blank=True),
            preserve_default=True,
        ),
    ]
