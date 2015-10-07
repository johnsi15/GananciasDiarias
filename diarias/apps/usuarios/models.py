from django.db import models
from django.contrib.auth.models import User

class Perfiles(models.Model):
	usuario = models.OneToOneField(User)
	nombre = models.CharField(max_length=20)
	apellido = models.CharField(max_length=25)
	telefono = models.IntegerField()
	correo = models.EmailField(max_length=70)

	def __unicode__(self):
		return self.usuario.username
