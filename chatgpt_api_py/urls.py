from django.urls import path

from . import views


app_name = "chatgpt_api_py"
urlpatterns = [
    path('test1/', views.ChatGPT_API_PY_Test1.as_view(), name="chatgpt_api_py_test1"),
]