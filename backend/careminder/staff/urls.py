from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.StaffListCreateView.as_view(), name="staff-list"),
    path(
        "<int:pk>/",
        views.StaffRetrieveUpdateDestroyView.as_view(),
        name="staff-detail",
    ),
]
