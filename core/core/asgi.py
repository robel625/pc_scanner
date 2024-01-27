"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""


import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()

from channels.security.websocket import AllowedHostsOriginValidator
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack

from channels.routing import ProtocolTypeRouter, URLRouter



import security.routing

application = ProtocolTypeRouter({
	'http': django_asgi_app,
	'websocket': AllowedHostsOriginValidator(
		JWTAuthMiddlewareStack(
			URLRouter(security.routing.websocket_urlpatterns)
		)
	)
})

