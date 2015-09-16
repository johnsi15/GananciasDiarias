from django.conf.urls import patterns, include, url
from .views import NuevoUsuario,Perfil,ActualizarPerfil

urlpatterns = patterns('',
	url(r'^perfil/$', 'apps.usuarios.views.Perfil', name="perfil"),
	url(r'^actualizar-perfil/$', 'apps.usuarios.views.ActualizarPerfil', name="actulizar-perfil"),
	url(r'^usuario-nuevo/$', 'apps.usuarios.views.NuevoUsuario', name="registrar-usuario"), #asi se asi anteriormente
	
)