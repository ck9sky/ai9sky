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
