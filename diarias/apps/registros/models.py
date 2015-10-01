from django.db import models
from django.contrib.auth.models import User

class Registro(models.Model):
	fecha = models.DateField()
	ganancia = models.IntegerField()
	gasto = models.IntegerField()
	nota = models.CharField(max_length=80)
	usuario = models.ForeignKey(User)

	def __unicode__(self):
		return self.usuario.username

