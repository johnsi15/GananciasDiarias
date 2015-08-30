from django.conf.urls import patterns, include, url
from .views import index #el punto despues del views es para que busque dentro de la misma carpeta el archivo y no comienze a buscar en otras carpetas

urlpatterns = patterns('',
	url(r'^$', index.as_view()),
	#url(r'^$', 'apps.inicio.views.index'), asi se asi anteriormente
)