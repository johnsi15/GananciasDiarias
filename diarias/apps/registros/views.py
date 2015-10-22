from django.views.generic import CreateView,TemplateView,ListView
from .models import Registro
from django.core.urlresolvers import reverse_lazy 
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.db.models import Count, Min, Sum, Avg, Max
from django.core import serializers
from django.http import HttpResponse

class AgregarRegistro(CreateView):
	# template_name = 'registro/registroDiario.html'#primeramente el nombre de la carpeta que esta en templetes y luego el nombre del arhivo como tal
	# model = Registro
	#success_url = reverse_lazy('registrar_ganancia')#redireccionamos depues de registrar 

	def post(self, request, *args, **kwargs):
		registro = Registro()
		id_user = request.POST['usuario']
		user = User.objects.get(id=id_user)

		registro.fecha = request.POST['fecha']
		registro.ganancia = request.POST['ganancia']
		registro.gasto = request.POST['gasto']
		registro.nota = request.POST['nota']
		registro.usuario = user

		registro.save()

		registros = Registro()
		registros = Registro.objects.all()
			# id_user = request.GET['usuario']
			# user = User.objects.get(id=id_user)
		ctx = {'registros': registros}

		return render_to_response('registro/registroDiario.html', ctx, context_instance=RequestContext(request))

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
		registros = Registro.objects.filter(usuario__id=id_user) 
	 	data = serializers.serialize('json', registros,
	 					fields=('fecha','ganancia','gasto','nota'))
		return HttpResponse(data)

class EliminarRegistro(CreateView):

	def post(self, request, *args, **kwargs):
		# print 'poraca esta pasando bien ...........'
		id_r = request.POST['id_eliminar'] #traemos el id de elemento o nota que vamso a eliminar
		print id_r
		id_user = request.user.id  #traemos el id del usuario
		r = Registro.objects.get(id=id_r)
		r.delete()
		registros = Registro.objects.filter(usuario__id=id_user) 
		data = serializers.serialize('json', registros,
	 					fields=('fecha','ganancia','gasto','nota'))
		return HttpResponse(data)

class VerGanancias(ListView):
	template_name = 'registro/verGanancias.html'
	#model = Registro
	#context_object_name = "registros"

	def get(self, request,*args, **kwargs):
		registros = Registro()
		registros = Registro.objects.all()
		#user = User.objects.get(id=id_user)
		id_user = request.user.id
		#print id_user
	  	ganancia = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('ganancia'))
	  	gasto = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('gasto'))

	 	ctx = {'registros': registros,'ganancia':ganancia, 'gasto':gasto}
	 	return render_to_response('registro/verGanancias.html', ctx, context_instance=RequestContext(request))

class VerGastos(ListView):
	template_name = 'registro/verGastos.html'
	#model = Registro
	#context_object_name = "registros"	

	def get(self, request,*args, **kwargs):
		registros = Registro()
		registros = Registro.objects.all()
		#user = User.objects.get(id=id_user)
		#print 
		id_user = request.user.id

	  	ganancia = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('ganancia'))
	  	gasto = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('gasto'))
	 	ctx = {'registros': registros,'ganancia':ganancia, 'gasto':gasto}
	 	return render_to_response('registro/verGastos.html', ctx, context_instance=RequestContext(request))
