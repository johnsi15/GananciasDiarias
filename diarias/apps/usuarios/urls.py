from django.conf.urls import patterns, include, url
from .views import NuevoUsuario,Perfil,ActualizarPerfil,CambiarClave,register_confirm,Gracias

urlpatterns = patterns('',
	url(r'^usuario-nuevo/$', 'apps.usuarios.views.NuevoUsuario', name="registrar-usuario"), #asi se asi anteriormente
	url(r'^perfil/$', 'apps.usuarios.views.Perfil', name="perfil"),
	url(r'^perfil/actualizar-perfil/(?P<id_user>\d+)/$', 'apps.usuarios.views.ActualizarPerfil', name="actulizar-perfil"),
	url(r'^perfil/cambiar-clave/$', 'apps.usuarios.views.CambiarClave', name="cambiar-clave"),
	url(r'^confirmar/(?P<activation_key>\w+)/$', 'apps.usuarios.views.register_confirm', name="confirmar-correo"),
	url(r'^gracias/$', 'apps.usuarios.views.Gracias', name="cambiar-clave"),
)