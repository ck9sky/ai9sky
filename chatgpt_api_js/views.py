from django.conf import settings
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_JS_Test1(generic.FormView):
    # Ref. Tagbirds, tagchapters/views.py, UpdateTagChapterEventFormFieldNameDescAjax
    form_class = forms.ChatGPT_API_JS_Test1_Hidden_Form
    ## model = models.xxxxxx
    template_name = "chatgpt_api_js/chatgpt_api_js.html"

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_js:chatgpt_api_js_test1")

    def get(self, request, *args, **kwargs):  ############### ????????
        response = super().get(request, *args, **kwargs)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'chatgpt_api_key': settings.OPENAI_CHATGPT_API_KEY})
        return response


class ChatGPT_API_JS_Test1_Prompt(generic.FormView):
    form_class = forms.ChatGPT_API_JS_Test1_Prompt_Form
    ## model = models.xxxxxx
    template_name = "chatgpt_api_js/chatgpt_api_js.html"

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_js:chatgpt_api_js_test1")
