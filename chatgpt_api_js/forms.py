from django import forms

##from . import models


class ChatGPT_API_JS_Test1_Hidden_Form(forms.Form):
	pass


class ChatGPT_API_JS_Test1_Prompt_Form(forms.Form):
	prompt = forms.CharField()
