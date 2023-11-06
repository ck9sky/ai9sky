from django.urls import path

from . import views


app_name = "chatgpt_api_js"
urlpatterns = [
    path('test1/', views.ChatGPT_API_JS_Test1.as_view(), name="chatgpt_api_js_test1"),

    ############### NOT GOOD SOLUTION 11/5/23 ###################################################
    # path('test1/', views.ChatGPT_API_JS_Test1.as_view(), name="chatgpt_api_js_test1"),
    # path('test1redirect/', views.ChatGPT_API_JS_Test1_Redirect.as_view(), name="chatgpt_api_js_test1_redirect"),
    ############### NOT GOOD SOLUTION 11/5/23 ###################################################
]
