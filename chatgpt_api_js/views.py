from django.conf import settings
## from django.urls import reverse_lazy
from django.http import JsonResponse
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_JS_Test1(generic.TemplateView):
    """ Access ChaptGPT API using (mostly) javascript.
    	DANGER: Using Django like this make not be secure given API will be
    	passed (via ajax) to javascript, BUT JAVASCRIPT GLOBAL VAR WILL NOT BE USED! 11/2/23
    """
    # form_class = forms.ChatGPT_API_JS_Test1_Form  ############## Form not needed?
    ## model = models.
    template_name = "chatgpt_api_js/chatgpt_api_js.html"

    # @staticmethod
    # def get(request, *args, **kwargs):
    #     """ ChatGPT_API_JS_Test1, get(), receives GET request from chatgpt_api_js.js $.get():
    #         The OpenAI ChatGPT API key is returned (to chatgpt_api_js.js). This is security measure to hide the value
    #         of API key. IMPORTANT: THE API KEY MUST NOT BE SAVED TO A JAVASCRIPT GLOBAL VARIABLE !!!.
    #     """
    #     return JsonResponse({'chatgpt_api_key': settings.OPENAI_CHATGPT_API_KEY})
