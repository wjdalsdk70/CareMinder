from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("all/", views.PatientListView.as_view()),
    path("", views.PatientCreateView.as_view()),
    path("<int:pk>/", views.PatientDetailView.as_view()),
]
