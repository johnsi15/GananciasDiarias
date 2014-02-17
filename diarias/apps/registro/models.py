from django.db import models

class Registro(models.Model):
	fecha = models.DateField()
	ganancia = models.IntegerField()
	gasto = models.IntegerField()
	nota = models.CharField(max_length=80)

	def __unicode__(self):
		return self.fecha

