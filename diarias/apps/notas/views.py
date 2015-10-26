from django.shortcuts import render
from django.views.generic import TemplateView,ListView,CreateView
from .models import Notas
from django.shortcuts import render_to_response,get_object_or_404
from django.template import RequestContext,Template,Context
from django.core import serializers
from django.http import HttpResponse,HttpResponseRedirect
from django.contrib.auth.models import User
#from django.core.urlresolvers import reverse_lazy
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import datetime
# eliminar las notas 
class EliminarNota(CreateView):

	def post(self, request, *args, **kwargs):
		# print 'poraca esta pasando bien ...........'
		id_n = request.POST['ideliminar'] #traemos el id de elemento o nota que vamso a eliminar
		id_user = request.user.id  #traemos el id del usuario
		n = Notas.objects.get(id=id_n)
		n.delete()
		notas = Notas.objects.filter(usuario__id=id_user).order_by('-fecha')#filtramos y ordenamos por fecha 
		paginator = Paginator(notas, 10)#Paginamos o la cantidad de datos que vamos a ver 
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
			datos = paginator.page(paginator.num_pages)
		#devolvemos los datos ya filtrados y la cantidad de paginator
		data = serializers.serialize('json', datos,
	 	    			fields=('fecha','titulo','nota'))
		return HttpResponse(data)
# ver todas las notas y editar las notas :D
class NotaRapida(CreateView,ListView):
	template_name = 'notas/notasRapidas.html'
	#model = Notas
	#success_url = reverse_lazy('menu')
	#context_object_name = "registros"
	# modificamos la notas 
	def get(self, request, *args, **kwargs):
		id_user = request.user.id
		notas = Notas.objects.filter(usuario__id=id_user).order_by('-fecha')
		paginator = Paginator(notas, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
			datos = paginator.page(paginator.num_pages)

		ctx = {'datos': datos}

		return render_to_response('notas/notasRapidas.html',ctx, context_instance=RequestContext(request))

class ModificarNota(CreateView,ListView):
	template_name = 'notas/notasRapidas.html'

	def post(self, request, *args, **kwargs):
	 	id_n = request.POST['idnota']
	 	id_user = request.user.id
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
		notas = Notas.objects.filter(usuario__id=id_user).order_by('-fecha')
		paginator = Paginator(notas, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
			datos = paginator.page(paginator.num_pages)

		data = serializers.serialize('json', datos,
	 					fields=('fecha','titulo','nota'))
		return HttpResponse(data)
