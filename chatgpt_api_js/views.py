## from django.urls import reverse_lazy
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_JS_Test1(generic.TemplateView):
    """ Access ChaptGPT API using (mostly) javascript.
    	DANGER: Using Django like this make not be secure given API will be
    	passed (via ajax) to javascript, BUT JAVASCRIPT GLOBAL VAR WILL NOT BE USED! 11/2/23
    """
    form_class = forms.ChatGPT_API_JS_Test1_Form
    ## model = models.Taghouse
    template_name = "chatgpt_api_js/chatgpt_api_js.html"