from django.urls import include, path
from . import views

urlpatterns = [
    path(
        "",
        views.RequestListCreateView.as_view(),
        name="request-list"
    ),
    path(
        "<int:pk>/",
        views.RequestRetrieveUpdateDestroyView.as_view(),
        name="request-detail",
    )
]
