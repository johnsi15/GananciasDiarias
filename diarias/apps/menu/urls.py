from django.conf.urls import patterns, include, url
from .views import Menu,AgregarAjax
from apps.registros.views import AgregarRegistro,ModificarRegistro,EliminarRegistro

urlpatterns = patterns('',
	url(r'^menu/$', Menu.as_view(), name="menu"),
	url(r'^agregarAjax/$', AgregarAjax.as_view(), name="agregarAjax"),
	url(r'^registrar/$', AgregarRegistro.as_view() , name="registrar_ganancia" ),
	url(r'^modificar/$', ModificarRegistro.as_view() , name="modificar_ganancia" ),
	url(r'^eliminar/$', EliminarRegistro.as_view() , name="eliminar_ganancia" ),
	#url(r'^$', 'apps.menu.views.menu'), asi se asi anteriormente
)