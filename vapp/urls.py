from django.conf.urls import patterns, url
from django.contrib import auth
from django.contrib.auth import views as auth_views
urlpatterns = patterns('vapp.views',
	url(r'^$', 'home', name='home'),
	url(r'^delete/(?P<pk>\d+)/$', 'home', name='delete_item'),
	url(r'^played/(?P<pk>\d+)/$', 'played_item', name='played_item'),
	url(r'^vote/$', 'vote_item', name='vote_item'),

	url(r'^accounts/login/$', auth_views.login, {'template_name': 'login.html'}),
	url(r'^logout/$', auth_views.logout,name="logout"),
	url(r'^pchange/$', auth_views.password_change, {'post_change_redirect':'/'},name='password_change'),
)