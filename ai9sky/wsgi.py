"""
WSGI config for ai9sky project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ai9sky.settings')

# On local dev/test, the next 3 lines are unnecessary when starting the            <-- please add these comments ...
# test server from command line (./manage.py runserver) because the command
# line uses .bash_profile line "set -a; source ~/.env_ai9sky; set +a" to
# load environment variables for dev. But in future if any any tool or software
# is ever used to start dev server without command line, then these next 3
# lines might be able to load environment variables. Otherwise you probably
# need create your virtualenv with virtualenvwrapper (or probably
# pyenv-virtualenvwrapper) copy or move next 3 lines to postactivate file
# of the virtualenv folder.
# load environment variables, run before calling get_wsgi_application()! 10/29/23
from dotenv import load_dotenv
home_folder = os.path.expanduser('~')
load_dotenv(os.path.join(home_folder, '.env_ai9sky'))

application = get_wsgi_application()
