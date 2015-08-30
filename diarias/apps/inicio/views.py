from django.shortcuts import render_to_response
from django.views.generic import TemplateView

class index(TemplateView):
	template_name = 'inicio/index.html'
#asi se asi anteriormente 
# def index(request):
# 	return render_to_response('inicio/index.html')
