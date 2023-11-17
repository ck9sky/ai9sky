## Experiments with OpenAI ChatGPT and DALLE pages, and Possibly other APIs.

This Django project experiments with use of various Artificial Intelligence/AI APIs, primarily APIs 
from openai.com. This project may include other experiments, such as 3rd-party model testing.

This Django project consists of different ways to access OpenAI ChatGPT and DALLE APIs. <u>__Each app of 
this project is dedicated to a single API and/or method of accessing that API.__</u> I may add experiments 
with APIs from other sites (such as Google or Facebook).

In the future I made add one or more apps to experiment with *clones* of 3rd party AI models&mdash;3rd 
party models would reside in *this* website/project (instead of being accessed via API of a 
*different* website). Downloading 3rd party AI models is probably much more sophisticated way
of using AI and may require special knowledge or training I do not currently have.

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

### Reference:

~/ai9sky/ai9sky/settings.py, version_cache_bust = 'v=W.XYZ'
~/ai9sky/templatetags/site_wide_template_tags.py, cacheBusterFileNames()

## Notes on getting API Key from OpenAI.com

I'm not sure social login account (with Google) will enable me to get ChatGPT API key?

1. Social login w/ Google cdk_______@_____.com (or should I open a password account w/ OpenAI?)
   Click on ChatGPT button.
2. DANGER: OpenAI seems to have a "remember me" feature that "sort of" keeps you logged in.
   BUT, to access Personal settings, YOU MAY NEED TO LOGIN "AGAIN" (even if it seems unnecessary?)
3. Browse to here: https://platform.openai.com/api-keys  <-- Or else try your Personal icon picture ... "View API Keys"
   WARNING: Sometimes, you API key gets "deleted"?
   Maybe during debug, too many errors, OpenAIcom deletes it?
   If the key is missing, or you don't see any keys listed, MAKE A NEW ONE.
4. YOU API KEYS PAGE: https://platform.openai.com/account/api-keys
   TO CREATE NEW API KEY:
   Click "+Create new secret key"
   Popup...
   Name: ChatGPT API - ai9sky.com
   Button: Create secret key
   DANGER: Copy the ENTIRE key to safe location (DO NOT ALLOW IT TO BE WRITTEN TO GITHUB!)
   (OpenAI will never let you know what this key is again!)
   Done
   WARNING: You may need to use API key at least once within several hours or it will be revoked?!
11/5/23 cdk

