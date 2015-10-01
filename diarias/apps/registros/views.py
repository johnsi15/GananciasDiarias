from django.views.generic import CreateView,TemplateView,ListView
from .models import Registro
from django.core.urlresolvers import reverse_lazy 
#from django.shortcuts import render_to_response
#from django.template import RequestContext

class RegistroGanancia(CreateView):
	template_name = 'registro/registroDiario.html'#primeramente el nombre de la carpeta que esta en templetes y luego el nombre del arhivo como tal
	model = Registro
	success_url = reverse_lazy('ver_registros')#redireccionamos depues de registrar 
	
class VerRegistros(ListView):
	template_name = 'registro/verRegistros.html'
	model = Registro
