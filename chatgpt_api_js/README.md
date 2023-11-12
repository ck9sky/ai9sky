### This Django app (chatgpt_api_js) is Based on Treehouse course

[https://teamtreehouse.com/library/build-a-basic-chatgpt-clone-with-vanilla-javascript/build-a-basic-chatgpt-clone-with-vanilla-javascript
](https://teamtreehouse.com/library/build-a-basic-chatgpt-clone-with-vanilla-javascript/build-a-basic-chatgpt-clone-with-vanilla-javascript)

This app (chatgpt_api_js) is a "pure" JavaScript solution to access OpenAI.com ChatGPT API.
I will probably never use this method, but I should experiment with it.
But the Python openai module is (probably) the better solution (chaptgpt_api_py).

WARNING: This is not very pretty. I do not want to have to use "pure javascript" solution
if I am to use the Django framework. BUT THIS APP IS PROBABLY HIGHLY USEFUL IN SEEING WHAT
IT TAKES TO DIRECTLY INTERFACE WITH OPENAI API (in this case, the ChatGPT API).

ALSO be aware: ChatGPT 3.5 turbo will be deprecated ~2024. You may need to use a different,
updated API in the future. 11/5/23 cdk

### I need to use a database for this app?

You can read some of my comments in chatgpt_api_py.js where I discuss a problem that app 'chatgpt_api_js' does not 
suffer from. You really want to create a *running chatlog* where previous prompt/message replies continue to be seen 
(you just have to scroll up etc.) BUT this app is not "pure javascript" and suffers from get()/post() submits that I 
should not have to spend debug time on.

SOLUTION: Since I would want to store these running chatlogs in the Django database, anyway, I will create table(s) 
and extra complexity to achieve running chatlog. Not really a problem, would do it anyway, but sort of bugs me that I 
am unable to do this as simply as the other app (chatgpt_api_js). 11/11/23
