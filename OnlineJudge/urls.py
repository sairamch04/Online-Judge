from django.conf.urls import patterns, url

from .views  import *

urlpatterns = patterns('',
    url(r'^$',view_contests,name='view_contests'),
    


    url(r'^create_contest/$',create_contest,name='create_contest'),
    #view submissions
    url(r'^submissions/$',submissions,name='submissions'),
    #view contests
    
    #show all problems in contst
    url(r'^contest/(?P<id>\d+)/$',view_contest,name='view_contest'),
    #show a single problem and editor
    url(r'^problem/(?P<id>\d+)$',view_problem,name='view_problem'),

    url(r'^practise/$',practise,name='practise'),
    url(r'^contest/code/(?P<id>\d+)/$',contest_code,name='contest_code'),
    url(r'^practise/code/(?P<id>\d+)/$',practise_code,name='practise_code'),


    
    #ajax calls
    url(r'^compile_ajax/$',compile_ajax,name='compile_ajax'),
    url(r'^compile_practise_ajax/$',compile_practise_ajax,name='compile_practise_ajax'),
    url(r'^get_filename/(?P<id>\d+)/$',get_filename,name="get_filename"),
    url(r'^get_code/$',get_code,name="get_code"),
    url(r'^get_problemshtml/$',get_problemshtml,name="get_problemshtml"),

    )
    



