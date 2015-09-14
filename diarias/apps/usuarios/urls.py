from django.conf.urls import patterns, include, url
from .views import NuevoUsuario

urlpatterns = patterns('',
	#url(r'^usuario/nuevo$', NuevoUsuario.as_view(), name="nuevo_usuario"),
	url(r'^usuario/nuevo$', 'apps.usuarios.views.NuevoUsuario'), #asi se asi anteriormente
)