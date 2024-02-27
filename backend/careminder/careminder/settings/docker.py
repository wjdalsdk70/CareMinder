from .base import *

ALLOWED_HOSTS = ["localhost", "43.200.196.223","careminder.shop","www.careminder.shop"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'cmdb_prd',
        'USER': 'cmuser',
        'PASSWORD': '1234',
        'HOST': 'host.docker.internal',
        'PORT': '5432',
    }
}

CORS_ORIGIN_WHITELIST = [
    'http://43.200.196.223:5000',
    'http://43.200.196.223:5500'# 추가된 출처
]

CSRF_TRUSTED_ORIGINS = [
    'http://43.200.196.223:5500',
]