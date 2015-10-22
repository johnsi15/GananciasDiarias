from django.shortcuts import render
from django.views.generic import TemplateView,ListView,CreateView
from .models import Notas
from django.shortcuts import render_to_response,get_object_or_404
from django.template import RequestContext,Template,Context
from django.core import serializers
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.models import User
#from django.core.urlresolvers import reverse_lazy
import datetime
# eliminar las notas 
class EliminarNota(CreateView):

	def post(self, request, *args, **kwargs):
		# print 'poraca esta pasando bien ...........'
		id_n = request.POST['ideliminar'] #traemos el id de elemento o nota que vamso a eliminar
		id_user = request.user.id  #traemos el id del usuario
		n = Notas.objects.get(id=id_n)
		n.delete()
		notas = Notas.objects.filter(usuario__id=id_user) 
		data = serializers.serialize('json', notas,
	 	    			fields=('fecha','titulo','nota'))
		return HttpResponse(data)
# ver todas las notas y editar las notas :D
class NotaRapida(CreateView,ListView):
	template_name = 'notas/notasRapidas.html'
	model = Notas
	#success_url = reverse_lazy('menu')
	context_object_name = "registros"
	# modificamos la notas 
	def post(self, request, *args, **kwargs):
		
		if request.method == 'POST' and request.is_ajax():
			id_n = request.POST['idnota']
			#print id_n
			id_user = request.user.id
			#print id_user

			n = Notas.objects.get(id=id_n)
			#print n
			#user = User.objects.get(id=id_user)
			fecha = datetime.datetime.now()
	 		titulo = request.POST['titulo']
	  		nota = request.POST['nota']
			n.fecha = fecha
			n.nota = nota
			n.titulo = titulo 
			n.save()
			notas = Notas.objects.filter(usuario__id=id_user) 
		 	data = serializers.serialize('json', notas,
	 					fields=('fecha','titulo','nota'))
			return HttpResponse(data)
