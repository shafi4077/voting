from django.conf.urls import patterns, url
from django.contrib import auth
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = patterns('vapp.views',
	url(r'^$', 'home', name='home'),
	url(r'^delete/(?P<pk>\d+)/$', 'home', name='delete_item'),
	url(r'^played_item/$', 'played_item', name='played_item'),
	url(r'^create_item/$', 'create_item', name='create_item'),
	url(r'^vote/$', 'vote', name='vote'),
	url(r'^delete/$', 'delete', name='delete'),
	url(r'^leaderboard/$', TemplateView.as_view(template_name='leaderboard.html')),
	url(r'^accounts/login/$', auth_views.login, {'template_name': 'login.html'}),
	url(r'^logout/$', auth_views.logout,name="logout"),
	url(r'^get_list/','get_list', name='get_list'),
	url(r'^pchange/$', auth_views.password_change, {'post_change_redirect':'/'},name='password_change'),
)+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)