from django.conf.urls import patterns, include, url
from .views import Menu,AgregarAjax
from apps.registros.views import AgregarRegistro

urlpatterns = patterns('',
	url(r'^menu/$', Menu.as_view(), name="menu"),
	url(r'^agregarAjax/$', AgregarAjax.as_view(), name="agregarAjax"),
	url(r'^registrar/$', AgregarRegistro.as_view() , name="registrar_ganancia" ),
	#url(r'^$', 'apps.menu.views.menu'), asi se asi anteriormente
)