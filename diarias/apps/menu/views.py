from django.views.generic import TemplateView

class Menu(TemplateView):
	template_name = 'menu/menu.html'
    # Redirect to a success page.