from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()
    if not username or not password:
        return JsonResponse({
            'result': "username or password can not be empty"
        })
    if password != password_confirm:
        return JsonResponse({
            'result': "The password entered twice is not the same"
        })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': "The username already exists"
        })
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo="https://c-ssl.duitang.com/uploads/blog/202009/12/20200912230640_iisqm.jpg")
    login(request, user)
    return JsonResponse({
        'result': "success"
    })