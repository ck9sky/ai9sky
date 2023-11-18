from django.conf import settings
from django.contrib import messages
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

from openai import OpenAI   # The openai Python library. 11/17/23

## from . import models
from . import forms


class DALLE_API_PY_Test1(generic.FormView):
    """ This app (dalle_api_py) is more like a "traditional" Django app because Python openai Library is used (instead
        of relying mostly on JavaScript to use DALLE API). HOWEVER, if you ever want this app (as of Nov 2023), to have
        identical features as dalle_api_js' (the "mostly JS" app for DALLE API access), you will need to replicate the
        advantage 'dalle_api_js' has, where 'dalle_api_js' uses no page reloads because of GET/POST's to remote "Django"
        database: THIS APP CURRENTLY CANNOT SHOW A TRUE "RECENTS" IMAGE LOG: PRIOR DALLE PROMPT/RESPONSE SESSION IS
        "THROWN AWAY" WITH NEXT PAGE RELOAD. 11/17/23
        -------------------------------------------------------------------------------------------------------------------------

        -------------------------------------------------------------------------------------------------------------------------
        OPENAI DOCS FOR DALLE API
        -- openai.com (may need to login, browse back to openai.com)  
        -- API | Docs (menu)  
        -- API reference (tab)  
        -- ENDPOINTS | Images (side bar)  
        -- Create image ... etc.  
    """
    form_class = forms.DALLE_API_PY_Test1_Prompt_Form
    template_name = "dalle_api_py/dalle_api_py.html"
    plus_context = dict()  # Special trick: plus_context custom attrb, but maybe there is better way to "NOT" use a Django db?

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("dalle_api_py:dalle_api_py_test1")

    def get_context_data(self, **kwargs):

        # print("DALLE_API_PY_Test1, get_context_data() ...")  ############ test (GOOD)

        context = super().get_context_data(**kwargs)
        if self.plus_context:
            if 'prompt' in self.plus_context:
                context['prompt'] = self.plus_context['prompt']
            else:
                context['prompt'] = ""

            if 'image_url' in self.plus_context:
                context['image_url'] = self.plus_context['image_url']
            else:
                context['image_url'] = ""
        else:
            context['prompt'] = ""
            context['image_url'] = ""
        return context

    def form_valid(self, form):
        """ We will add code to show this message (or remove this message if not necessary. 11/11/23
        """

        # print("\n(1)DALLE_API_PY_Test1, form_valid(): client = OpenAI()...\n")  ########## test (BAD)

        img_request = form.cleaned_data['prompt']
        if settings.NULL_STR.__eq__(img_request):
            messages.error(
                self.request,
                "You Must Enter Image Request!")  # BUT as of Nov 2023, site does not display Django messages. 11/17/23
            form.add_error('prompt', True)
            return self.form_invalid(form)
        """
            Now we use Python library module openai. 11/11/23
            -----------------------------------------------------------------
            https://platform.openai.com/docs/libraries 
            https://platform.openai.com/docs/api-reference?lang=python  
            https://github.com/openai/openai-python
        """

        # print("\n(2)DALLE_API_PY_Test1, form_valid(): client = OpenAI()...\n")  ########## test

        client = OpenAI()
        image_completion = client.images.generate(
            # model='dalle-api-2',  # NO?! Python openai Library for DALLE API does NOT want a model properyt?! 11/18/23
            prompt=img_request,
            n=1,
            size='512x512',
            quality='standard',   ################ ???
            # response_format='url',  ############ ???
        )

        self.plus_context['prompt'] = img_request
        self.plus_context['image_url'] = image_completion.data[0].url

        print(f"image_completion.data[0].url: {image_completion.data[0].url}")  ############## test
        # print(f"image_completion: {image_completion}")  ############## test

        return super().form_valid(form)

