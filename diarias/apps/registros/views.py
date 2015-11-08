from django.views.generic import CreateView,TemplateView,ListView
from .models import Registro
from django.core.urlresolvers import reverse_lazy 
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.db.models import Count, Min, Sum, Avg, Max
from django.core import serializers
from django.http import HttpResponse
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
import datetime
# Agregar Ganancias y Gastos.
class AgregarRegistro(CreateView):
	# template_name = 'registro/registroDiario.html'#primeramente el nombre de la carpeta que esta en templetes y luego el nombre del arhivo como tal
	# model = Registro
	#success_url = reverse_lazy('registrar_ganancia')#redireccionamos depues de registrar 

	def post(self, request, *args, **kwargs):
		registro = Registro()
		id_user = request.POST['usuario']
		user = User.objects.get(id=id_user)

		if request.POST['fecha'] == '':
			registro.fecha = datetime.datetime.now()
		else:
			registro.fecha = request.POST['fecha']

		registro.ganancia = request.POST['ganancia']
		registro.gasto = request.POST['gasto']
		registro.nota = request.POST['nota']
		registro.usuario = user
		registro.save()
		datos = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
		
		paginator = Paginator(datos, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
			datos = paginator.page(paginator.num_pages)
		data = serializers.serialize('json', datos,
	 				fields=('fecha','ganancia','gasto','nota'))
		return HttpResponse(data)
	
#Modificar Ganancias y Gastos
class ModificarRegistro(CreateView):

	def post(self, request, *args, **kwargs):
		id_registro = request.POST['id_registro']
		#print id_n
		id_user = request.user.id
		#print id_user
		r = Registro.objects.get(id=id_registro)
		#print n
		#user = User.objects.get(id=id_user)
		fecha = request.POST['fecha']
 		ganancia = request.POST['ganancia']
 		gasto = request.POST['gasto']
  		nota = request.POST['nota']
		r.fecha = fecha
		r.nota = nota
		r.ganancia = ganancia
		r.gasto = gasto 
		r.save()
		datos = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
		paginator = Paginator(datos, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
	 		datos = paginator.page(paginator.num_pages)

	 	data = serializers.serialize('json', datos,
	 					fields=('fecha','ganancia','gasto','nota'))
		return HttpResponse(data)
# Eliminar Ganancia y Gastos
class EliminarRegistro(CreateView):

	def post(self, request, *args, **kwargs):
		# print 'poraca esta pasando bien ...........'
		id_r = request.POST['id_eliminar'] #traemos el id de elemento o nota que vamso a eliminar
		print id_r
		id_user = request.user.id  #traemos el id del usuario
		r = Registro.objects.get(id=id_r)
		r.delete()
		datos = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
		paginator = Paginator(datos, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
	 		datos = paginator.page(paginator.num_pages) 

		data = serializers.serialize('json', datos,
	 					fields=('fecha','ganancia','gasto','nota'))
		return HttpResponse(data)

class VerGanancias(ListView):
	template_name = 'registro/verGanancias.html'
	#model = Registro
	#context_object_name = "registros"

	def get(self, request,*args, **kwargs):
		id_user = request.user.id
		datos = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
		paginator = Paginator(datos, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
	 		datos = paginator.page(paginator.num_pages)

	  	ganancia = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('ganancia')).values()[0]
	  
	 	ctx = {'datos': datos, 'ganancia': ganancia}
	 	return render_to_response('registro/verGanancias.html', ctx, context_instance=RequestContext(request))
    
class VerGastos(ListView):
	template_name = 'registro/verGastos.html'
	#model = Registro
	#context_object_name = "registros"	

	def get(self, request,*args, **kwargs):
		id_user = request.user.id
		datos = Registro.objects.filter(usuario__id=id_user).order_by('-fecha')
		paginator = Paginator(datos, 10)
		page = request.GET.get('page','1')
		try:datos = paginator.page(page )
		except PageNotAnInteger:
		 	datos = paginator.page(1)
		except EmptyPage:
	 		datos = paginator.page(paginator.num_pages)

	  	gasto = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('gasto')).values()[0]
	  	
	 	ctx = {'datos': datos, 'gasto': gasto}
	 	return render_to_response('registro/verGastos.html', ctx, context_instance=RequestContext(request))

class Reportes(ListView):
	template_name = 'registro/reportes.html'

	def get(self, request,*args, **kwargs):

		
	 	return render_to_response('registro/reportes.html', context_instance=RequestContext(request))
	 	
class VerReportes(TemplateView):

	def get(self, request, *args, **kwargs):
		id_user = request.user.id
		fecha1 = request.GET['fecha1']
		fecha2 = request.GET['fecha2']

		#datos = Registro.objects.filter(Q(fecha=fecha1) & Q(fecha=fecha2),usuario__id=id_user)
		datos = Registro.objects.filter(fecha__range=(fecha1, fecha2),usuario__id=id_user)
		
		data = serializers.serialize('json', datos,
	 				fields=('ganancia','gasto'))
		return HttpResponse(data)