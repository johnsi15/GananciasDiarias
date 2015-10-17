from django.views.generic import TemplateView,ListView,CreateView
from apps.registros.models import Registro
from apps.notas.models import Notas
from django.core.urlresolvers import reverse_lazy 
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.db.models import Count, Min, Sum, Avg, Max
import datetime

class AgregarAjax(CreateView):
	
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
	 	registros = Notas.objects.all()
		ctx = {'registros':registros}
		return render_to_response('notas/verNotas.html', ctx,  context_instance=RequestContext(request))

class Menu(ListView,CreateView):
	template_name = 'menu/menu.html'
    # Redirect to a success page.
	#model = Registro
	#context_object_name = "registros"
	#success_url = reverse_lazy('menu')#redireccionamos depues de registrar 

	def get(self, request, *args, **kwargs):
		if request.method == 'POST':
			estado = False
			registro = Registro()
			id_user = request.POST['usuario']
			user = User.objects.get(id=id_user)

			registro.fecha = request.POST['fecha']
			registro.ganancia = request.POST['ganancia']
			registro.gasto = request.POST['gasto']
			registro.nota = request.POST['nota']
			registro.usuario = user

			registro.save()
			estado = True
			ctx = {'estado': estado}

			return render_to_response('menu/menu.html', ctx, context_instance=RequestContext(request))
		else:
			registros = Registro()
			registros = Registro.objects.all()
			#print request.user.id
			id_user = request.user.id
			# id_user = request.GET['usuario']
			# user = User.objects.get(id=id_user)
			ganancia = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('ganancia'))
	  		gasto = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('gasto'))
		 	ctx = {'registros': registros, 'ganancia':ganancia, 'gasto':gasto}

			return render_to_response('menu/menu.html',ctx, context_instance=RequestContext(request))