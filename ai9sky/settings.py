"""
Django settings for ai9sky project.

Generated by 'django-admin startproject' using Django 4.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path

import os

""" Version Cache Bust: "v=W.XYZ" per given master branch version "vW.XYZ. Used for query string cache busting.
    Do not insert "?". Must include "=" or query string will fail. 10/13/23 """
VERSION_CACHE_BUST = "v=0.015"

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-z2k5u)z3%vwb8fvo6*l)b#0gopp%d6mf@8ezl=o6&##(b#un5_'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

if DEBUG:
    ALLOWED_HOSTS = []
elif not DEBUG:
    ALLOWED_HOSTS = [
        ## 'mysite.com',
        ## 'www.mysite.com',
    ]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ai9sky.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            # site_wide_template_tags need not be loaded, it is defined here as 'builtins'
            'builtins': ['templatetags.site_wide_template_tags', ],
        },
    },
]

WSGI_APPLICATION = 'ai9sky.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
elif not DEBUG:
    DATABASES = {
        'default': {
            ## 'ENGINE': 'django.db.backends.postgresql',
            ## 'NAME': os.getenv('AI9SKY_DB_NAME'),
            ## 'USER': os.getenv('AI9SKY_DB_USER'),         # ai9sky database admin (live, not test db)
            ## 'PASSWORD': os.getenv('AI9SKY_DB_USER_PW'),  # ai9sky database admin password (live, not test db)
            ## 'HOST': os.getenv('AI9SKY_DB_HOST'),
            ## 'PORT': os.getenv('AI9SKY_DB_PORT'),
        }
    }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'assets'), ]

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

"""
Django Debug Toolbar - update INTERNAL_IPS to allow display. This was not necessary with DDTB 1.7 (before 1.8).
https://django-debug-toolbar.readthedocs.io/en/stable/installation.html
"""
INTERNAL_IPS = ['127.0.0.1', ]

SESSION_COOKIE_AGE = 7776000    # 7776000 sec = 90 days (no commas)
SESSION_COOKIE_HTTPONLY = True  # True: client-side javascript cannot access session cookie
"""WARNING: Set SESSION_COOKIE_SECURE = True only if using https server! """
if DEBUG:
    SESSION_COOKIE_SECURE = False   # False: Django debug server is http.
elif not DEBUG:
    SESSION_COOKIE_SECURE = True    # True: If this were live/production site
