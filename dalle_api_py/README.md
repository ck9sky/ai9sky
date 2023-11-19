### This Django app (dalle_api_py) uses Python Library "module" openai

[https://platform.openai.com/docs/libraries](https://platform.openai.com/docs/libraries)  
[https://platform.openai.com/docs/api-reference?lang=python](https://platform.openai.com/docs/api-reference?lang=python)  
[https://github.com/openai/openai-python](https://github.com/openai/openai-python)  

This app (dalle_api_py) accesses OpenAI DALLE API using the Python library "module" openai (discussed 
in one of the links above). Hopefully it will be easier approach than the (mostly) "pure" JavaScript approach used 
in app 'chatgpt_api_js'.

### I need to use a database for this app?

You can read some of my comments in dalle_api_py and/or chatgpt_api_py.js where I discuss a problem that app 
'dalle_api_js' does not suffer from. You really want to create a *running recents* where previous prompt/image replies 
continue to be seen (you just have to scroll through a list etc.) BUT this app is not "pure javascript" and suffers 
from get()/post() submits that I should not have to spend debug time on.

SOLUTION: Since I would want to store these "recents" images in the Django database, anyway, I will create table(s) 
and extra complexity to achieve running "recents. Not really a problem, would do it anyway, but sort of bugs me that I 
am unable to do this as simply as the other app (dalle_api_js). 11/18/23

### OPENAI DOCS FOR CHATGPT (not as useful given this app use Python 'openai' Library)

-- openai.com (may need to login, browse back to openai.com)  
-- API | Docs (menu)  
-- API reference (tab)  
-- ENDPOINTS | Chat (sidebar)  
-- Create chat completion ... etc.  
