## Experiments with OpenAI ChatGPT and DALLE pages, and Possibly other APIs.

This Django project experiments with use of various Artificial Intelligence/AI APIs, primarily APIs 
from openai.com. This project may include other experiments, such as 3rd-party model testing.

This Django project consists of different ways to access OpenAI ChatGPT and DALLE APIs. <u>__Each app of 
this project is dedicated to a single API and/or method of accessing that API.__</u> I may add experiments 
with APIs from other sites (such as Google or Facebook).

In the future I made add one or more apps to experiment with *clones* of 3rd party AI models&mdash;3rd 
party models that would reside in *this* website/project (instead of being accessed via API of a 
*different* website). Downloading 3rd party AI models is probably much more sophisticated way 
of using AI and may require special knowledge or training I do not currently have. But you would never 
lose access to your 3rd party model as long as you own the original "clone" (and maybe paid money for it).

## Use Markdown syntax for this document (README.md):

[Online Markdown editor](https://stackedit.io/app#)  
[Markdown cheatsheet, adam-p/markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[Markdown cheatsheet, markdownguide.org](https://www.markdownguide.org/cheat-sheet/)  
[Markdown extended syntax, markdownguide.org](https://www.markdownguide.org/extended-syntax/)

## Query String Cache Busting

CACHE BUSTING: Every change to css or javascript files requires either (1) user clears their browser history such that new
css/js files will be loaded into their web browser, or (2) the website/developer forces "cache busting" instead using a "cache
busting strategy" so user won't have to clear history. WITHOUT CACHE BUSTING IN (1) OR (2), CHANGES YOU MAKE TO CSS, JS,
IMAGES, OTHER STATIC MEDIA ETC. WILL NOT BE SEEN BY USER AND YOUR WEBSITE WILL LIKELY BE BADLY BROKEN. 

## References:

~/ai9sky/ai9sky/settings.py, version_cache_bust = 'v=W.XYZ'
~/ai9sky/templatetags/site_wide_template_tags.py, cacheBusterFileNames()

## Notes on getting API Key from OpenAI.com

1. WARNING: I think intense debug where you send "too many" odd or illogical requests to OpenAI.com can 
   trigger AUTOMATIC DELETION OF YOUR OPENAI API KEY. Very odd feeling to have your api key "vanish", 
   and you waste time figuring out what just happened. IN NOV 2023 I HAD TO CREATE new API key several times 
   (AND of course updated ~/.env_ai9sky & restarted Terminal).
2. A bit embarrassing to admit it, but I don't get how to use OpenAI.ocm's website. I don't think it is 
   related to social login w/ Google cdk_______@_____.com, but it's a remote possiblity. I found the urls I discuss 
   below may be far easier to use instead of navigating OpenAI.com (where some pages seem to have no navations buttons or menu). 
   Especially frustrating was accessing my list of api keys--easier to copy/paste url [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).
3. WARNING: I think OpenAI.com has a lower level auth key that continues to let you use ChatGPT or DALLE even after force logoff 
   of your account, where force logoff happens after only a few minutes (?), and you are never notified about it. This can also 
   be a bit confusing, like you have to REMEMBER to LOGIN "again"?
4. BROWSE TO YOUR API KEYS PAGE:  
   Maybe this: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) (worked 11/17/23)  
   Maybe this: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) (Personal icon picture | View API Keys)  
   DANGER: As noted above, SOMETIMES YOUR API KEY VANISHES, probably due to debugging errors. If so, you will need to 
   create a new API key (you can use a single API key for all APIs).  
   TO CREATE NEW API KEY:  
   Click "+Create new secret key"  
   Popup...  
   Name: "API key" (I would like to know why some people use multiple keys...)  
   Button: Create secret key  
   DANGER: Copy the ENTIRE key to safe location (DO NOT ALLOW IT TO BE WRITTEN TO GITHUB!)  
   (OpenAI will never let you know what this key is again!)  
   Done  
   WARNING: You may need to use API key at least once within several hours or it will be revoked?!  
11/5/23 cdk  
   
### OpenAI Dalle URL for AI images AND to Buy Credits for More Images

[https://labs.openai.com](https://labs.openai.com)  

Again, OpenAI.com is very confusing site to navigate!  


