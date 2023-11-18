from django.urls import path

from . import views


app_name = "dalle_api_py"
urlpatterns = [
    path('test1/', views.DALLE_API_PY_Test1.as_view(), name="dalle_api_py_test1"),
]