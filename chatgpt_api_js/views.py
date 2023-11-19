from django.conf import settings
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_JS_Test1(generic.FormView):
    """ Just one view used, no redirect view, only way to ensure api key is available to javascript when needed.
        Apps 'chatgpt_api_js' and 'dalle_api_js' MUST use ONE view for this--I may have preferred to use 2 views,
        one a redirect, but was able squeeze everything into this one view SO THAT API KEY IS HIDDEN (and never
        assigned to JavaScript GLOBAL variable). 11/8/23
       ------------------------------------------------------------------------------------------------------------
       OPENAI DOCS FOR CHATGPT:
       -- openai.com (may need to login, browse back to openai.com)
       -- API | Docs (menu)
       -- API reference (tab)
       -- ENDPOINTS | Chat (side bar)
       -- Create chat completion ... etc.
    """
    form_class = forms.ChatGPT_API_JS_Test1_Hidden_Form
    template_name = "chatgpt_api_js/chatgpt_api_js.html"

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_js:chatgpt_api_js_test1")

    def get(self, request, *args, **kwargs):
        """ The form for this view never posts anything, and is just used to deliver api key to javascript. 11/5/23 """

        print("\nChatGPT_API_JS_Test1, get() ...\n")   ################ test

        response = super().get(request, *args, **kwargs)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'chatgpt_api_key': settings.OPENAI_API_KEY})
        return response
