from django.http import HttpResponseRedirect
from django.urls import reverse_lazy
from django.views import generic

"""  __________________________________________________________________________
    |                                                                          |
    |                            DANGER !!!                                    |
    |                    NO MODEL IMPORTS ALLOWED!                             |
    |     NO IMPORTS OF CLASSES OR FUNCTIONS THAT USE MODEL IMPORTS!           |
    |                                                                          |
    |  DANGER: THIS FILE SHOULD NOT IMPORT DJANGO MODELS. Even though my local |
    |  Django TEST db/server (test/dev/dq.sqlite3) may allow model imports,    |
    |  I discovered my host provider (PythonAnywhere) seems to not "allow" it  |
    |  ("model not found" errors).                                             |
    |                                                                          |
    |  NOTE: ~/ai9sky/ai9sky/ folder is not a Django app! It Django project's  |
    |  sitewide "stub" folder (created by django-admin startproject).          |
    |  i.e. ~/ai9sky/ai9sky/ IS NOT IN settings.py INSTALLED_APPS.             |
    |  10/27/23                                                                |
    |__________________________________________________________________________|
"""


class HomeRedirects(generic.TemplateView):
    """ HomeRedirects view allows different redirects based on whether user is authenticated or a guest, or perhaps
    some other db/sessions var state, or etc. HOWEVER, as of Oct 2023, anyone who browses to root of ai9sky site
    is redirected to home-no-redirects. 10/27/23
    """
    template_name = "index.html"

    def get(self, request, *args, **kwargs):
        return HttpResponseRedirect(
            reverse_lazy("home-no-redirects")  # The About page
        )


class HomeNoRedirects(generic.TemplateView):
    """ THE 'ABOUT' PAGE: As of Oct 2023, all root page loads redirect to this view, where index.html displays
    a number of buttons per each Django app that tests OpenAI.com APIs and alternative approaches to using them.
    """
    template_name = "index.html"
