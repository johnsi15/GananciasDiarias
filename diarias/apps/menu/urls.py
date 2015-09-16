from django.conf.urls import patterns, include, url
from .views import Menu

urlpatterns = patterns('',
	url(r'^menu/$', Menu.as_view(), name="menu"),
	#url(r'^$', 'apps.menu.views.menu'), asi se asi anteriormente
)