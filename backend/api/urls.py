from django.urls import path

from . import views

urlpatterns = [
    path('tasks/', views.tasks),
    path('tasks/create/', views.taskCreate),
    path('tasks/<int:task_id>/', views.taskDetail),
]

