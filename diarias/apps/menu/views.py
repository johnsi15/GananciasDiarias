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
	 	notas = Notas.objects.filter(usuario__id=id_user) 
	 	#print notas
	 	data = serializers.serialize('json', notas,
	 					fields=('fecha','titulo','nota'))
	 	#print data
	 	return HttpResponse(data)
		#ctx = {'registros':registros}
		#return render_to_response('notas/verNotas.html', ctx,  context_instance=RequestContext(request))

class Menu(ListView,CreateView):
	template_name = 'menu/menu.html'
    # Redirect to a success page.
	#model = Registro
	#context_object_name = "registros"
	#success_url = reverse_lazy('menu')#redireccionamos depues de registrar 

	def get(self, request, *args, **kwargs):
		registros = Registro()
		registros = Registro.objects.all()
		# paginator = Paginator(registros, 5)
		#page = request.GET.get('page')
	    # try:
	    #    pagination = paginator.page(page)
	    # except PageNotAnInteger:
	    #     # If page is not an integer, deliver first page.
	    #     pagination = paginator.page(1)
	    # except EmptyPage:
	    #     # If page is out of range (e.g. 9999), deliver last page of results.
	    #     pagination = paginator.page(paginator.num_pages)
		#print request.user.id
		id_user = request.user.id
		# id_user = request.GET['usuario']
		# user = User.objects.get(id=id_user)
		ganancia = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('ganancia')).values()[0]
	  	gasto = Registro.objects.filter(usuario__id=id_user).aggregate(Sum('gasto')).values()[0]
	  	paginate_by = 3
		ctx = {'registros': registros, 'ganancia':ganancia, 'gasto':gasto}

		return render_to_response('menu/menu.html',ctx, context_instance=RequestContext(request))