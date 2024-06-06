from django.http import HttpResponse

def index(request):
    line1 = '<h1 style="text-align: center">我的第一个网页</h1>'
    line2 = '<img src="https://ts1.cn.mm.bing.net/th/id/R-C.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0">'
    return HttpResponse(line1 + line2)

