from django.contrib import admin
from django.urls import path
from RetoApp import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name="home"),
    path('review/', views.review, name="review"),
    path('search/', views.search, name="search")
]
