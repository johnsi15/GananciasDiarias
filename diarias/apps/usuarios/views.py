from django.views.generic import TemplateView,FormView
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse  
from django.shortcuts import render_to_response,get_object_or_404
from django.template import RequestContext
from django.core.urlresolvers import reverse_lazy
from .forms import UserForm,EditarPerfil,EditarContrasenaForm
from .models import Perfiles
from apps.menu.views import Menu
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib import auth  
from django.core.context_processors import csrf  
from django.core.mail import send_mail  
import hashlib, datetime, random  
from django.utils import timezone


def NuevoUsuario(request):  
    args = {}
    args.update(csrf(request))
    if request.method == 'POST':
        form = UserForm(request.POST)
        args['form'] = form
        if form.is_valid(): 
            form.save()  
            username = form.cleaned_data['username']
            nombre = form.cleaned_data['nombre']
            apellido = form.cleaned_data['apellido']
            telefono = form.cleaned_data['telefono']
            email = form.cleaned_data['correo']
            salt = hashlib.sha1(str(random.random())).hexdigest()[:5]            
            activation_key = hashlib.sha1(salt+email).hexdigest()            
            key_expires = datetime.datetime.today() + datetime.timedelta(2)

            #Obtener el nombre de usuario
            user=User.objects.get(username=username)

            # Crear el perfil del usuario                                                                                                                                 
            new_profile = Perfiles(usuario=user, nombre= nombre, apellido= apellido, activation_key=activation_key, 
                telefono=telefono, correo= email, date_key_expires=key_expires)
            new_profile.save()

            #enviamos correo 
            email_subject = 'Confirma tu cuenta'
            email_body = "Hola %s, gracias por registrarte para validar tu cuenta da click en el enlace, recuerda que si despues de dos dias no activas la cuenta el correo expide, http://127.0.0.1:8000/confirmar/%s" % (username, activation_key)

            send_mail(email_subject, email_body, 'myemail@example.com',
                [email], fail_silently=False)

            return HttpResponseRedirect('/gracias/')
    else:
        args['form'] = UserForm()

    return render_to_response('usuarios/nuevoUsuario.html', args, context_instance=RequestContext(request))

def register_confirm(request, activation_key):  
    #verificamos si esta logeado el user
    if request.user.is_authenticated():
        HttpResponseRedirect('/menu/')

    #verificamos el token que sea valido
    user_profile = get_object_or_404(Perfiles, activation_key=activation_key)

    #verificamos si el token aun esta activo
    if user_profile.date_key_expires < timezone.now():
        return render_to_response('usuarios/confirm_expired.html', context_instance=RequestContext(request))
    #si todo esta bien lo mandamos a la bienbenida
    user = user_profile.usuario
    user.is_active = True
    user.save()
    return render_to_response('usuarios/confirmar.html', context_instance=RequestContext(request))

def Gracias(request):
    if request.method == 'GET':
        #ctx = {'email': social_user}
        return render_to_response('usuarios/gracias.html', context_instance=RequestContext(request))

@login_required()
def Perfil(request):
    if request.method == 'GET':
        
        
        return render_to_response('usuarios/configuracion.html', context_instance=RequestContext(request))
   #template_name = 'usuarios/configuracion.html'

@login_required()
def ActualizarPerfil(request, id_user):
    #p=Perfiles.objects.get(id=id_user)
    p = get_object_or_404(Perfiles, id=id_user)
    if request.method == 'POST':
        formulario=EditarPerfil(request.POST)
        if formulario.is_valid():
            nombre = formulario.cleaned_data['nombre']
            apellido = formulario.cleaned_data['apellido']
            telefono = formulario.cleaned_data['telefono']
            correo = formulario.cleaned_data['correo']
            p.nombre = nombre
            p.apellido = apellido
            p.telefono = telefono
            p.correo = correo
            p.save()
            return HttpResponseRedirect('/perfil')
        
    if request.method == 'GET':
        formulario = EditarPerfil(initial={
                'nombre':p.nombre,
                'apellido':p.apellido,
                'telefono':p.telefono,
                'correo':p.correo
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
    