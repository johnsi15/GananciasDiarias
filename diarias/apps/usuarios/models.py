from django.db import models
from django.contrib.auth.models import User

class Perfiles(models.Model):
	usuario = models.OneToOneField(User)
	nombre = models.CharField(max_length=10)
	apellido = models.CharField(max_length=15)
	telefono = models.IntegerField()

	def __unicode__(self):
		return self.usuario.username
