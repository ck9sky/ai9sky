from django import forms

##from . import models


class ChatGPT_API_PY_Test1_Prompt_Form(forms.Form):
    prompt = forms.CharField(
        max_length=200,
        error_messages={'max_length': "200 characters max"},
    )
