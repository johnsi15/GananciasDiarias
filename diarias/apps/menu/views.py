from django.views.generic import TemplateView,ListView,CreateView
from apps.registros.models import Registro
from apps.notas.models import Notas
#from django.core.urlresolvers import reverse_lazy 
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.db.models import Count, Min, Sum, Avg, Max
from django.core import serializers
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
import datetime

class AgregarAjax(CreateView,TemplateView):
	
 	def post(self, request, *args, **kwargs):
 		estado = False
		notas = Notas()
		id_user = request.POST['usuario']
		user = User.objects.get(id=id_user)

	 	notas.fecha = datetime.datetime.now()
	 	notas.titulo = request.POST['titulo']
	 	notas.nota = request.POST['nota']
	 	notas.usuario = user

	 	notas.save()
	 	#registros = Notas.objects.all()
	 	notas = Notas.objects.filter(usuario__id=id_user).order_by('-fecha')#filtramos y ordenamos por fecha 
		paginator = Paginator(notas, 10)#Paginamos o la cantidad de datos que vamos a ver 
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
			datos = paginator.page(paginator.num_pages)
	 	#print notas
	 	data = serializers.serialize('json', datos,
	 					fields=('fecha','titulo','nota'))
	 	#print data
	 	return HttpResponse(data)
		#ctx = {'registros':registros}
		#return render_to_response('notas/verNotas.html', ctx,  context_instance=RequestContext(request))

class Menu(ListView):
	template_name = 'menu/menu.html'
    #Redirect to a success page.
	#model = Registro
	#context_object_name = "registros"
	#success_url = reverse_lazy('menu')#redireccionamos depues de registrar 
	def get(self, request, *args, **kwargs):
		id_user = request.user.id
		datos = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
		cont = 0
		for contador in datos:
			cont = cont + 1
		print cont
		paginator = Paginator(datos, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
	 		datos = paginator.page(paginator.num_pages)

		ganancia = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('ganancia')).values()[0]
		gasto = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('gasto')).values()[0]
		#print datos
		ctx = {'datos': datos, 'ganancia':ganancia, 'gasto':gasto, 'cont':cont}

		return render_to_response('menu/menu.html',ctx, context_instance=RequestContext(request))

class BuscarGananciasGastos(TemplateView):

	def get(self, request, *args, **kwargs):
		id_user = request.user.id
		palabra = request.GET['palabra']
		#print palabra
		if palabra == '':
			busqueda = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
			paginator = Paginator(busqueda, 10)
			page = request.GET.get('page','1')
			try:datos = paginator.page(page )
			except PageNotAnInteger:
			 	datos = paginator.page(1)
			except EmptyPage:
		 		datos = paginator.page(paginator.num_pages)

			data = serializers.serialize('json', datos,
			 					fields=('fecha','ganancia','gasto','nota'))
			 	#print data
			return HttpResponse(data)
		else:
			busqueda = Registro.objects.filter(usuario__id=id_user, fecha=palabra)
			data = serializers.serialize('json', busqueda,
			 					fields=('fecha','ganancia','gasto','nota'))
			 	#print data
			return HttpResponse(data)

class BuscarNotas(TemplateView):

	def get(self, request, *args, **kwargs):
		id_user = request.user.id
		palabra = request.GET['palabra']
		#print palabra
		if palabra == '':
			busqueda = Notas.objects.filter(usuario__id=id_user).order_by('-fecha')
			paginator = Paginator(busqueda, 10)
			page = request.GET.get('page','1')
			try:datos = paginator.page(page )
			except PageNotAnInteger:
			 	datos = paginator.page(1)
			except EmptyPage:
		 		datos = paginator.page(paginator.num_pages)

			data = serializers.serialize('json', datos,
	 					fields=('fecha','titulo','nota'))
			return HttpResponse(data)
		else:
			busqueda = Notas.objects.filter(Q(titulo__contains=palabra) | Q(nota__contains=palabra),usuario__id=id_user)
			
		 	data = serializers.serialize('json', busqueda,
	 					fields=('fecha','titulo','nota'))
			return HttpResponse(data)
				