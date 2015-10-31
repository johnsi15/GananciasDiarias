from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Perfiles
 
class UserForm(UserCreationForm):
    nombre = forms.CharField(
        max_length=20,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    apellido = forms.CharField(
        max_length=25,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    telefono = forms.IntegerField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    correo = forms.CharField(
        max_length=50,
        widget=forms.TextInput(attrs={'class': 'form-control','type': 'email'}))
   

class EditarPerfil(forms.Form):
    nombre = forms.CharField(
        max_length=20,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    apellido = forms.CharField(
        max_length=25,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    telefono = forms.IntegerField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    correo = forms.CharField(
        max_length=50,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
	# class Meta:
	# 	model = Perfiles

class EditarContrasenaForm(forms.Form):

    actual_password = forms.CharField(
        label='Clave actual',
        min_length=5,
        widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    password = forms.CharField(
        label='Nueva Clave',
        min_length=5,
        widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    password2 = forms.CharField(
        label='Repetir Clave',
        min_length=5,
        widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    def clean_password2(self):
        """Comprueba que password y password2 sean iguales."""
        password = self.cleaned_data['password']
        password2 = self.cleaned_data['password2']
        if password != password2:
            raise forms.ValidationError('Las Claves no coinciden.')
        return password2