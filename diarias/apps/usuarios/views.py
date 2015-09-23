from django.views.generic import TemplateView,FormView
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse_lazy
from .forms import UserForm,EditarPerfil,EditarContrasenaForm
from .models import Perfiles
from django.contrib.auth.hashers import make_password
#from django.contrib.auth.models import User


class NuevoUsuario(FormView):
    template_name = 'usuarios/nuevoUsuario.html'
    form_class = UserForm
    success_url = reverse_lazy('perfil')

    def form_valid(self, form):
        user = form.save()
        perfil = Perfiles()
        perfil.usuario = user
        perfil.nombre = form.cleaned_data['nombre']
        perfil.apellido = form.cleaned_data['apellido']
        perfil.telefono = form.cleaned_data['telefono']
        perfil.save()
        return super(NuevoUsuario, self).form_valid(form)

@login_required()
def Perfil(request):
    return render_to_response('usuarios/configuracion.html', context_instance=RequestContext(request))
   #template_name = 'usuarios/configuracion.html'

@login_required()
def ActualizarPerfil(request, id_user):
    #persona = request.GET.get('id_user')
    p=Perfiles.objects.get(id=id_user)
    if request.method == 'POST':
        formulario=EditarPerfil(request.POST, instance=p)
        if formulario.is_valid():
            nombre = formulario.cleaned_data['nombre']
            apellido = formulario.cleaned_data['apellido']
            telefono = formulario.cleaned_data['telefono']
            p.nombre = nombre
            p.apellido = apellido
            p.telefono = telefono
            p.save()
            return HttpResponseRedirect('/perfil')
        
    if request.method == 'GET':
        formulario = EditarPerfil(initial={
                'nombre':p.nombre,
                'apellido':p.apellido,
                'telefono':p.telefono
            })
    ctx = {'formulario':formulario,'perfiles':p}
    return render_to_response('usuarios/actualizarPerfil.html', ctx, context_instance=RequestContext(request))
    #template_name = 'usuarios/actualizarPerfil.html'

@login_required()
def CambiarClave(request):
    if request.method == 'POST':
        form = EditarContrasenaForm(request.POST)
        if form.is_valid():
            request.user.password = make_password(form.cleaned_data['password'])
            request.user.save()
            return HttpResponseRedirect('/perfil')
    else:
        form = EditarContrasenaForm()
    return render_to_response('usuarios/cambiarClave.html',{'form': form}, context_instance=RequestContext(request))
    