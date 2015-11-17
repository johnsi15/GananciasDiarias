from django.db import models
from django.contrib.auth.models import User
import datetime

class Perfiles(models.Model):
	usuario = models.OneToOneField(User)
	nombre = models.CharField(max_length=20)
	apellido = models.CharField(max_length=25)
	telefono = models.IntegerField()
	correo = models.EmailField(max_length=70)
	activation_key = models.CharField(max_length=40, blank=True)
	date_key_expires = models.DateTimeField(default=datetime.date.today())

	def __str__(self):
		return self.usuario.username
