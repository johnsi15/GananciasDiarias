# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='perfiles',
            name='correo',
            field=models.CharField(default=1, max_length=50),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='perfiles',
            name='apellido',
            field=models.CharField(max_length=25),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='perfiles',
            name='nombre',
            field=models.CharField(max_length=20),
            preserve_default=True,
        ),
    ]
