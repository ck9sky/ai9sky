from django.conf import settings
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_JS_Test1(generic.FormView):
    form_class = forms.ChatGPT_API_JS_Test1_Hidden_Form
    template_name = "chatgpt_api_js/chatgpt_api_js.html"

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_js:chatgpt_api_js_test1")

    def get(self, request, *args, **kwargs):
        """ The form for this view never posts anything, and is just used to deliver api key to javascript. 11/5/23 """
        response = super().get(request, *args, **kwargs)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'chatgpt_api_key': settings.OPENAI_CHATGPT_API_KEY})
        return response
