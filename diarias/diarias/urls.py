from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'diarias.views.home', name='home'),
    # url(r'^diarias/', include('diarias.foo.urls')),

    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^admin/', include(admin.site.urls)),

    #INICIO
    url(r'^', include('apps.inicio.urls')),#indicamos que vamos a usar la urls de inicio
    #REGISTROS
    url(r'^', include('apps.registros.urls')),
    #MENU
    url(r'^', include('apps.menu.urls')),
    #NUEVO_USUARIO
    url(r'^', include('apps.usuarios.urls')),
)

