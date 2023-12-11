from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.SettingsRetrieveUpdateView.as_view(), name="settings-detail"),
    path(
        "area/",
        views.AreaListCreateView.as_view(),
        name="area-list",
    ),
    path(
        "area/<int:pk>/",
        views.AreaRetrieveUpdateDestroyView.as_view(),
        name="area-detail",
    ),
]
