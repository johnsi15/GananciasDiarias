from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth.forms import UserCreationForm
from django.template import RequestContext
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from .forms import RegistroUsuario

# def NuevoUsuario(request):
#     if request.method == 'POST':
#       	formulario = UserCreationForm(request.POST)
#       	if formulario.is_valid:
#       		formulario.save()
#       		return HttpResponseRedirect('/')
#     else:
#         formulario = UserCreationForm()
#     return render_to_response('usuarios/nuevoUsuario.html', {'formulario': formulario}, context_instance=RequestContext(request))
@login_required()
def NuevoUsuario(request):
    if request.method == 'POST':  # If the form has been submitted...
        form = RegistroUsuario(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass
 
            # Process the data in form.cleaned_data
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password"]
            email = form.cleaned_data["email"]
            first_name = form.cleaned_data["first_name"]
            last_name = form.cleaned_data["last_name"]
 
            # At this point, user is a User object that has already been saved
            # to the database. You can continue to change its attributes
            # if you want to change other fields.
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
 
            # Save new user attributes
            user.save()
 
            #return HttpResponseRedirect('/perfil')  # Redirect after POST
            return render_to_response('usuarios/configuracion.html', context_instance=RequestContext(request))
    else:
        form = RegistroUsuario()
 
    data = {
        'form': form,
    }
    return render_to_response('usuarios/nuevoUsuario.html', data, context_instance=RequestContext(request))


@login_required()
def Perfil(request):
    return render_to_response('usuarios/configuracion.html', context_instance=RequestContext(request))
   #template_name = 'usuarios/configuracion.html'

@login_required()
def ActualizarPerfil(request):
    return render_to_response('usuarios/actualizarPerfil.html', context_instance=RequestContext(request))
    #template_name = 'usuarios/actualizarPerfil.html'
