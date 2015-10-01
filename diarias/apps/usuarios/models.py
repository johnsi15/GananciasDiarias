from django.db import models
from django.contrib.auth.models import User

class Perfiles(models.Model):
	usuario = models.OneToOneField(User)
	nombre = models.CharField(max_length=20)
	apellido = models.CharField(max_length=25)
	telefono = models.IntegerField()
	correo = models.CharField(max_length=50)

	def __unicode__(self):
		return self.usuario.username
