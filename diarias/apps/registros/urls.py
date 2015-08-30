from django.conf.urls import patterns, include, url
from .views import RegistroGanancia,VerRegistros

urlpatterns = patterns('',
	url(r'^registrar/$', RegistroGanancia.as_view() , name="registrar_ganancia" ),
	url(r'^verganancias/$', VerRegistros.as_view() , name="ver_registros" ),
)
