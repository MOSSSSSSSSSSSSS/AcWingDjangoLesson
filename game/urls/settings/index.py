from django.urls import path
from game.views.settings.getinfo import getinfo
from game.views.settings.login import signin 
from game.views.settings.logout import signout

urlpatterns = [
    path("getinfo/", getinfo, name="setting_getinfo"),
    path("login/", signin, name="settings_login"),
    path("logout/", signout, name="settings_logout"),
]
