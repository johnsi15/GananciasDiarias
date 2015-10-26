from django.conf.urls import patterns, include, url
from .views import NotaRapida,EliminarNota,ModificarNota

urlpatterns = patterns('',
	url(r'^ver-notas-rapidas/$', NotaRapida.as_view(), name = 'nota_rapida'),
	url(r'^modificarNota/$', ModificarNota.as_view(), name = 'modificar_nota'),
	url(r'^eliminarNota/$', EliminarNota.as_view(), name = 'eliminar_nota'),
)