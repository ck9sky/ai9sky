## Experimental OpenAI ChatGPT and DALLE pages.

This is a Django project to experiment with creation of APIs of openai.com api.
This project may include other experiments, such as 3rd-party model testing.

## Use Markdown syntax for this document (README.md):
## This project uses a custom user model, one that extends AbstractBaseUser, and has custom fields as of Spring 2019

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
3. TWO TABS NOW OPEN: Go to (or browse to) OpenAI.com
   Menu: API|Overview: https://openai.com/product
4. NEXT PAGE: ...
   Button: Get Started
5. NEXT PAGE: https://auth0.openai.com/u/signup/identifier?state=...
   Already have an account? Log in (click the "Log in" link). i.e. Login "again"?
   Continue with Google...
6. YOUR PROFILE PAGE!
   GET TO THIS URL: https://platform.openai.com/overview
   (You may need to verify with google app on iphone...)
   Top of page, upper right, (my google account image), click "Personal"
   Menu expands down: click "View API Keys"
7. YOU API KEYS PAGE: https://platform.openai.com/account/api-keys
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

