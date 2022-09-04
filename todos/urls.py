from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("routes", views.get_routes),
    
    path('', views.get_todos, name="todos"),
    path('create', views.create_todo, name = "create-todo"),
    path('<str:pk>', views.get_todo, name="todo"),
    path('<str:pk>/delete', views.delete_todo, name="delete-todo"),
]
