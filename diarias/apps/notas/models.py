from django.db import models
from django.contrib.auth.models import User

class Notas(models.Model):
	fecha = models.DateField(blank=True)
	titulo = models.CharField(max_length=50, blank=True)
	nota = models.CharField(max_length=80, blank=True)
	usuario = models.ForeignKey(User)

	def __unicode__(self):
		return self.usuario.username
