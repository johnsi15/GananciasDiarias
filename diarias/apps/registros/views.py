from django.views.generic import CreateView,TemplateView,ListView
from .models import Registro
from django.core.urlresolvers import reverse_lazy 
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.db.models import Count, Min, Sum, Avg, Max

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
