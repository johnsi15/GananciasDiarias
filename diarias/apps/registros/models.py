from django.db import models
from django.contrib.auth.models import User

class Registro(models.Model):
	fecha = models.DateField()
	ganancia = models.IntegerField()
	gasto = models.IntegerField()
	nota = models.CharField(max_length=80, blank=True)
	usuario = models.ForeignKey(User)

	def __unicode__(self):
		return self.usuario.username
		
#podemos crear mas modelos lo bueno seria crea maximo 5 modelos 