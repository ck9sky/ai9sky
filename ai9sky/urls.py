"""
URL configuration for openai project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

from ai9sky import views_no_models

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views_no_models.HomeRedirects.as_view(), name="home"),  # The About page: Root
    path('noredir/', views_no_models.HomeNoRedirects.as_view(), name="home-no-redirects"),  # The About page: Non-Root
    
    #path('chatgpt_api_js/', include("chatgpt_api_js.urls")),
    #path('chatgpt_api_py/', include("chatgpt_api_py.urls")),
    #path('dalle_api_js/', include("dalle_api.urls_js")),
    
    # robots.txt in sitewide templates folder. Browse to 127.0.0.1:8000/robots.txt (production: ai9sky.com/robots.txt).
    # Documentation and info: https://www.robotstxt.org/robotstxt.html + https://adamj.eu/tech/2020/02/10/robots-txt/
    path(
        "robots.txt",
        TemplateView.as_view(template_name="robots.txt", content_type="text/plain"), ),
]

# ================ # # TEST/DEV/Debug=True: Django Debug Toolbar # # ================= # #
if settings.DEBUG:
   import debug_toolbar
   urlpatterns = [
       path('__debug__/', include(debug_toolbar.urls)),
   ] + urlpatterns
