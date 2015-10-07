from django.conf.urls import patterns, include, url
from .views import Menu,AgregarAjax

urlpatterns = patterns('',
	url(r'^menu/$', Menu.as_view(), name="menu"),
	url(r'^agregarAjax/$', AgregarAjax.as_view(), name="agregarAjax"),
	#url(r'^$', 'apps.menu.views.menu'), asi se asi anteriormente
)