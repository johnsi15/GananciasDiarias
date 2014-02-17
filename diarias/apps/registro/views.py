from django.views.generic import CreateView,TemplateView
from .models import Registro
from django.core.urlresolvers import reverse_lazy 

class RegistroGanancia(CreateView):
	template_name = 'registro/registroDiario.html'
	model = Registro
	success_url = reverse_lazy('ver_registros')#redireccionamos depues de registrar 

class VerRegistros(TemplateView):
	template_name = 'registro/verRegistros.html'
