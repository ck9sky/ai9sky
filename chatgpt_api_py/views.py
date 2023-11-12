from django.conf import settings
from django.contrib import messages
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_PY_Test1(generic.FormView):
    """ Just one view used................?......
    """
    form_class = forms.ChatGPT_API_PY_Test1_Prompt_Form
    template_name = "chatgpt_api_py/chatgpt_api_py.html"

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_py:chatgpt_api_py_test1")

    def form_valid(self, form):
        # We will add code to show this message (or remove this message if not necessary. 11/11/23
        if settings.NULL_STR.__eq__(form.cleaned_data['prompt']):
            messages.error(
                self.request,
                "You Must Enter a Question!")
            form.add_error('prompt', True)
            return self.form_invalid(form)

        self.request.session['prompt'] = form.cleaned_data['prompt']
        self.request.session.modified = True


    ############## REMOVE? possibly not needed ######################### 11/11/23
    # def get(self, request, *args, **kwargs):
    #     """ The form for this view never posts anything, and is just used to deliver api key to javascript. 11/5/23 """
    #     response = super().get(request, *args, **kwargs)
    #     if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
    #         return JsonResponse({'chatgpt_api_key': settings.OPENAI_API_KEY})
    #     return response