from django.urls import path

from . import views


app_name = "chatgpt_api_js"
urlpatterns = [
    path('test1/', views.ChatGPT_API_JS_Test1.as_view(), name="chatgpt_api_js_test1"),
]
