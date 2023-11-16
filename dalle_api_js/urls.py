from django.urls import path

from . import views


app_name = "dalle_api_js"
urlpatterns = [
    path('test1/', views.DALLE_API_JS_Test1.as_view(), name="dalle_api_js_test1"),
]
