### This Django app (chatgpt_api_js) is Based on Treehouse course

[https://teamtreehouse.com/library/build-your-own-ai-image-generator
](https://teamtreehouse.com/library/build-your-own-ai-image-generator)

DANGER: For javascript fetch(), I found the 'model' argument must not be used!
I am pretty sure model is dalle-2 or dalle-3 (in video, one of 'n' argument used to be 'num_images').

DANGER: AS NOTED BEFORE, MY OPENAI API KEY SEEMS TO AUTOMATICALLY DELETED IF, WHILE
DEBUGGING, TOO MANY ERRORS HAPPEN? RATHER CONFUSING.

This app (dalle_api_js) is a "pure" JavaScript solution to access OpenAI.com DALLE API.
I will probably never use this method, but I should experiment with it.
But the Python openai module is (probably) the better solution (e.g. ChatGPT similar app
chaptgpt_api_py, but I would name it dalle_api_py).

WARNING: This is not very pretty. I do not want to have to use "pure javascript" solution
if I am to use the Django framework. BUT THIS APP IS PROBABLY HIGHLY USEFUL IN SEEING WHAT
IT TAKES TO DIRECTLY INTERFACE WITH OPENAI API (in this case, the DALLE API).

ALSO be aware: DALLE version used in this app may be deprecated in future (2024+)

### OPENAI DOCS FOR DALLE API
 
-- openai.com (may need to login, browse back to openai.com)  
-- API | Docs (menu)  
-- API reference (tab)  
-- ENDPOINTS | Images (side bar)  
-- Create image ... etc.  