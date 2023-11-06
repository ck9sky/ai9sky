from django.conf import settings
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views import generic

## from . import models
from . import forms


class ChatGPT_API_JS_Test1(generic.FormView):
    # Ref. Tagbirds, tagchapters/views.py, UpdateTagChapterEventFormFieldNameDescAjax
    form_class = forms.ChatGPT_API_JS_Test1_Form
    ## model = models.xxxxxx
    template_name = "chatgpt_api_js/chatgpt_api_js.html"

    def get_success_url(self, *args, **kwargs):
        """ Does not leave the page """
        return reverse_lazy("chatgpt_api_js:chatgpt_api_js_test1")

    def get_queryset(self):
        return None

    def form_valid(self, form):
        """Django docs say to call super().form_valid() before you call
        is_ajax() 6/2/19
        Django 3.1 request.is_ajax() is deprecated, see comments above 9/21/20
        """
        response = super().form_valid(form)
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return JsonResponse({'chatgpt_api_key': settings.OPENAI_CHATGPT_API_KEY})
        return response


############### NOT GOOD SOLUTION 11/5/23 ###################################################
# class ChatGPT_API_JS_Test1(generic.TemplateView):
#     """ Access ChaptGPT API using (mostly) javascript.
#     	DANGER: Using Django like this make not be secure given API will be
#     	passed (via ajax) to javascript, BUT JAVASCRIPT GLOBAL VAR WILL NOT BE USED! 11/2/23
#     """
#     form_class = forms.ChatGPT_API_JS_Test1_Form
#     ## model = models.Taghouse
#     template_name = "chatgpt_api_js/chatgpt_api_js.html"
#
#
# class ChatGPT_API_JS_Test1_Redirect(generic.RedirectView):
#     """ Send OpenAI ChatGPT API key to Javascript (security, hide it). 11/5/23
#     """
#     # # form_class = forms.ChatGPT_API_JS_Test1_Form  ############## Form not needed?
#     # ## model = models.
#     # template_name = "chatgpt_api_js/chatgpt_api_js.html"
#
#     def get_redirect_url(self, *args, **kwargs):
#         return reverse_lazy("chatgpt_api_js:chatgpt_api_js_test1")
#
#     @staticmethod
#     def get(request, *args, **kwargs):
#         """ ChatGPT_API_JS_Test1, get(), receives GET request from chatgpt_api_js.js $.get():
#             The OpenAI ChatGPT API key is returned (to chatgpt_api_js.js). This is security measure to hide the value
#             of API key. IMPORTANT: THE API KEY MUST NOT BE SAVED TO A JAVASCRIPT GLOBAL VARIABLE !!!.
#         """
#         return JsonResponse({'chatgpt_api_key': settings.OPENAI_CHATGPT_API_KEY})
############### NOT GOOD SOLUTION 11/5/23 ###################################################
