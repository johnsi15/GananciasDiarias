from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse_lazy
from django.views.generic.edit import FormView
from django.shortcuts import render
from django.http import HttpResponseRedirect


def NuevoUsuario(request):
    if request.method == 'POST':
    	formulario = UserCreationForm(request.POST)
    	if formulario.is_valid:
    		formulario.save()
    		return HttpResponseRedirect('/')
    else:
       	formulario = UserCreationForm()
    return render(request, 'usuarios/nuevoUsuario.html', {'form': formulario})