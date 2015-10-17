from django.conf.urls import patterns, include, url
from .views import NotaRapida,EliminarNota

urlpatterns = patterns('',
	url(r'^ver-notas-rapidas/$', NotaRapida.as_view(), name = 'nota_rapida'),
	url(r'^eliminarNota/$', EliminarNota.as_view(), name = 'eliminar_nota'),
)