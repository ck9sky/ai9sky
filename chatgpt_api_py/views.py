from django.conf import settings
from django.contrib import messages
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

from openai import OpenAI   ################# NEW 11/11/23

## from . import models
from . import forms


class ChatGPT_API_PY_Test1(generic.FormView):
    """ Just one view used................?......
        https://stackoverflow.com/questions/6907388/updating-context-data-in-formview-form-valid-method
    """
    form_class = forms.ChatGPT_API_PY_Test1_Prompt_Form
    template_name = "chatgpt_api_py/chatgpt_api_py.html"
    plus_context = dict()    ################################ experiment

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_py:chatgpt_api_py_test1")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.plus_context:
            if 'prompt' in self.plus_context:
                context['prompt'] = self.plus_context['prompt']
            else:
                context['prompt'] = ""

            if 'message' in self.plus_context:
                context['message'] = self.plus_context['message']
            else:
                context['message'] = "Thinking"
        else:
            ######### stop using 'prompt' context var...
            context['prompt'] = ""
            context['message'] = "Thinking"

        print(f"\n(1) context = {context}\nkwargs = {kwargs}")  ############# test

        return context

    ############### test, this is not the real form_valie() ############# 11/11/23
    # def form_valid(self, form):  ############# experiment
    #     # We will add code to show this message (or remove this message if not necessary. 11/11/23
    #     print("\nform_valid() ...\n")  ############### test
    #     return super().form_valid(form)


    def form_valid(self, form):  ############# experiment
        # We will add code to show this message (or remove this message if not necessary. 11/11/23

        print("\nform_valid() ...\n")  ############### test

        question = form.cleaned_data['prompt']
        if settings.NULL_STR.__eq__(question):
            messages.error(
                self.request,
                "You Must Enter a Question!")
            form.add_error('prompt', True)
            return self.form_invalid(form)
        """
            Now we use Python library module openai. 11/11/23
        """
        client = OpenAI()
        chat_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": question}]
        )

        # kwargs = self.get_form_kwargs()
        # context = self.get_context_data(**kwargs)
        # print(f"\n(2) context = {context}\nkwargs = {kwargs}")  ############# test

        self.plus_context['prompt'] = question  ############ 'prompt' no longer a context var...
        self.plus_context['message'] = chat_completion.choices[0].message.content

        return super().form_valid(form)

    # ################ causes error ??!!!
    # def post(self, request, *args, **kwargs):
    #     print("\npost() ...\n")  ############### test
    #     super().post(request, *args, **kwargs)



    ############## REMOVE? possibly not needed ######################### 11/11/23
    # def get(self, request, *args, **kwargs):
    #     """ The form for this view never posts anything, and is just used to deliver api key to javascript. 11/5/23 """
    #     response = super().get(request, *args, **kwargs)
    #     if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
    #         return JsonResponse({'chatgpt_api_key': settings.OPENAI_API_KEY})
    #     return response