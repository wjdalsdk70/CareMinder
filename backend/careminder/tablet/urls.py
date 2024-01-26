from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.TabletCreateView.as_view(), name="tablet-list"),
    path(
        "<int:pk>/",
        views.TabletUpdateDestroyView.as_view(),
        name="tablet-detail",
    ),
    path("", views.TabletListView.as_view(), name="tablet-list"),
    path(
        "<int:pk>/",
        views.TabletRetrieveView.as_view(),
        name="tablet-detail",
    ),
]
