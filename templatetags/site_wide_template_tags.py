from django import template
from django.conf import settings


register = template.Library()


@register.simple_tag
def settings_DEBUG():
    """ Many templates do not require {% settings_DEBUG %} since sitewide layout.html uses it.
    But custom/include templates seem to require it to use {{ DEBUG }} on template.
    ------------------------------------------------------------------------------------------------------------------
    Return value of DEBUG in settings.py, ref. Django docs on settings.py:
    (1) settings_debug() returns True --> settings.py DEBUG=True
        (project is running on Django debug server 127.0.0.1:8000 or etc.)
    (2) settings_debug() returns False --> settings.py DEBUG=False
        (project is running on live (production) server Webfaction or etc.)
    EXAMPLE USE:
        {% settings_DEBUG as DEBUG %}
        ... {{ DEBUG }} ...
        {% if DEBUG %} ... {% endif %}  <!-- if DEBUG=True then Tagbirds project is in DEBUG mode -->
    """
    return settings.DEBUG


@register.simple_tag
def settings_VERSION_CACHE_BUST():
    """ Many templates do not require {% settings_VERSION_CACHE_BUST %} since sitewide layout.html uses it.
    But custom/include templates seem to require it to use {{ VERSION_CACHE_BUST }} on template.
    ------------------------------------------------------------------------------------------------------------------
    Return value of VERSION_CACHE_BUST in settings.py. This is constant used in several query string cache busting.
    Certain links/CDNs/images etc. cannot use cacheBusterFileNames() tag below.
    EXAMPLE USE:
        {% settings_VERSION_CACHE_BUST as VERSION_CACHE_BUST %}
        ... {{ VERSION_CACHE_BUST }} ...
        {% if VERSION_CACHE_BUST == 'W.XYZ' %} ... {% endif %}
    """
    return settings.VERSION_CACHE_BUST


@register.simple_tag
def cacheBusterFileNames():
    """Query string cache busting. Ensures fresh static media for browser.
    (1) UPDATE QUERYSTRING BELOW FOR EVERY NEW RELEASE/TAG OF TAGBIRDS! e.g. if latest release tag is "v0.68" -->
        queryString="?v0.68" ... first step of Webfaction cheat sheet "SWAP/UPDATE DJANGO PROJECT..."
    (2) THIS IS TEMPORARY(?) CACHE BUSTING STRATEGY FOR TWO REASONS: #1 query string cache busting may disable ALL
        caching due to proxies & networks not caching urls query strings. #2 does query string cache busting cause
        longer page loads? Somewhat noticeable to user? AGAIN, THIS CACHE  BUSTING STRATEGY IS TEMPORARY, HOPE TO NEVE\
        USE IT ON PRODUCTION SITE(?). PROFESSIONAL SOLUTION SUCH AS GULP, WEBPACK, OR ETC. SHOULD BE USED.
        https://www.alainschlesser.com/bust-cache-content-hash/
    (3) THIS TAG ONLY ADDRESSES CSS AND JAVASCRIPT FILES. IMAGE FILES MUST BE  CACHE BUSTED MANUALLY, rename
        file.img?vX.Y.Y to file.img?vX.Y.Z. Same manual file name changes applies to any non css/js static media  files
        that are updated (and thus must be cache busted).NOTE: SOME CSS FILES HAVE IMG FILE NAMES OR ETC. AND I DON'T
        CURRENTLY KNOW HOW TO "PASS" IMG FILE NAME TEXT TO A CSS FILE etc.
    (4) INVESTIGATE: Do not use cacheBusterFileNames() on pages that already have a cache busting strategy(?), such as
        "DOM/javascript refresh trick" at the bottom of tagphrases/tagphrase_update.html which already uses
        special query string cache busting TBTAGPHRASES1_load_tagphrase_update_js()  ### ### ### OLD/OBSOLETE COMMENT?
    """
    urlQueryString = f"?{settings.VERSION_CACHE_BUST}"
    CB = {
        "ai9sky_js": f"js/ai9sky.js{urlQueryString}",
        "ai9sky_css": f"css/ai9sky.css{urlQueryString}",
        #"chatgpt_api_js_css": f"chatgpt_api_js/css/chatgpt_api_js.css{urlQueryString}",
        #"chatgpt_api_js_js": f"chatgpt_api_js/js/chatgpt_api_js.js{urlQueryString}",
        #"chatgpt_api_py_css": f"chatgpt_api_py/css/chatgpt_api_py.css{urlQueryString}",
        #"chatgpt_api_py_js": f"chatgpt_api_py/js/chatgpt_api_py.js{urlQueryString}",
        #"dalle_api_js_css": f"dalle_api_js/css/dalle_api_js.css{urlQueryString}",
        #"dalle_api_js_js": f"dalle_api_js/js/dalle_api_js.js{urlQueryString}",
    }
    return CB


@register.simple_tag
def assign(value):
    """ Value can be an integer or a string. Assign value to a "template" variable (or a template context variable).
    Syntax:
        {% assign value as name %}          <-- name = value
    Example:
        {% assign 42 as meaning_of_life %}  <-- meaning_of_life = 42
        ...
        {{ meaning_of_life }}  <-- access value of meaning_of_life (displays 42)(on html template)
    """
    return value


@register.simple_tag
def assign_plus_1(value):
    """ Value must be an integer. Use in template {% for %} loops.
    Syntax:
        {% assign_plus_1 value as name %}     <-- name = value + 1
    Example:
        {% assign_plus_1 idx1 as idx2 %}      <-- idx2 = idx1 + 1
        ...
        {{ idx }}  <-- access new value of idx (on html template)
    """
    return value + 1


@register.simple_tag
def assign_minus_1(value):
    """ Value must be an integer. Use in template {% for %} loops.
    Syntax:
        {% assign_minus_1 value as name %}    <-- name = value - 1
    Example:
        {% assign_minus_1 idx1 as idx2 %}     <-- idx2 = idx1 - 1
        ...
        {{ idx }}  <-- access new value of idx (on html template)
    """
    return value - 1


@register.simple_tag
def append_str1_str2(str1, str2):
    """ Concatenate strings: "Add" str1 and str2 (in that order), aka. "append" strings (on a template). 8/2/23
    Syntax:
        {% append_str1_str2 str1 str2 as str3 %}
    Example:L
        {% append str1_str2 "good" "morning" as str %}  <-- str = "good morning"
        ...
        {{ str }}  <-- access "value" of str (displays "good morning")(on html template)
    """
    return str1 + str2
