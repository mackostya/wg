from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_events, name="events"),
    path('create', views.create_event, name = "create-event"),
    # path('<str:pk>/update', views.update_todo, name="update-todo"),
    # path('<str:pk>', views.get_todo, name="todo"),
    path('<str:pk>/delete', views.delete_event, name="delete-event"),
]
