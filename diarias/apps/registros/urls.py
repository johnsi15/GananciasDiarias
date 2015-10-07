from django.conf.urls import patterns, include, url
from .views import AgregarRegistro,VerGanancias,VerGastos

urlpatterns = patterns('',
	url(r'^registrar/$', AgregarRegistro.as_view() , name="registrar_ganancia" ),
	url(r'^ver-ganancias/(?P<id_user>\d+)/$', VerGanancias.as_view() , name="ver_ganancias" ),
	url(r'^ver-gastos/(?P<id_user>\d+)/$', VerGastos.as_view() , name="ver_gastos" ),
)
