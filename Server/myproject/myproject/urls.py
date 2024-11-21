"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Home import views
from rest_framework.authtoken.views import obtain_auth_token # by use of this we not need to create view for login it  
# is provided by rest framework itself


urlpatterns = [
    path('admin/', admin.site.urls),

    path('', views.chk, name='chk'),

    path('register/', views.Register.as_view(),name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    
     path('login',obtain_auth_token, name="login"),
     path('welcome',views.Welcome.as_view(),name="welcome"),
    path('userDetails/<int:pk>/',views.UserDetails.as_view(),name="userDetails"),
    # path('userDetails/',views.UserDetails.as_view(),name="userDetails"),
    path('user-details/', views.get_user_details, name='user-details'),
    
    
    # path('login_details/', views.login_details, name='login_details'),
    # path('posts/', views.post_list_create, name='post-list-create'),
    path("posts/", views.PostListCreateView.as_view(), name='post-list-create'),
    # path('posts/<int:pk>/', views.post_detail, name='post-detail'),
    path('postsss/', views.post_detail, name='view_post-detail'),
    path('postsss/<int:pk>/', views.post_detail, name='post-detail'),
    path('other_post/', views.other_post_detail, name='other_post'),
    
     path('posts/<int:post_id>/comments/', views.comment_list_create, name='comment-list-create'),
]
