# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('registros', '0002_registro_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registro',
            name='nota',
            field=models.CharField(max_length=80, blank=True),
            preserve_default=True,
        ),
    ]
