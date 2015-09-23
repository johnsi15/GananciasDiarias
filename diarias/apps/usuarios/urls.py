from django.conf.urls import patterns, include, url
from .views import NuevoUsuario,Perfil,ActualizarPerfil,CambiarClave

urlpatterns = patterns('',
	url(r'^usuario-nuevo/$', NuevoUsuario.as_view(), name="registrar-usuario"), #asi se asi anteriormente
	url(r'^perfil/$', 'apps.usuarios.views.Perfil', name="perfil"),
	url(r'^actualizar-perfil/(?P<id_user>\d+)/$', 'apps.usuarios.views.ActualizarPerfil', name="actulizar-perfil"),
	url(r'^cambiar-clave/$', 'apps.usuarios.views.CambiarClave', name="cambiar-clave"),

)