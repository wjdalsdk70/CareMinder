from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.PatientListCreateView.as_view(), name="patient-list"),
    path(
        "<int:pk>/",
        views.PatientRetrieveUpdateDestroyView.as_view(),
        name="patient-detail",
    ),
    path(
        "<int:patient_pk>/medical_examinations/",
        views.MedicalExaminationListCreateView.as_view(),
        name="examination-list",
    ),
    path(
        "<int:patient_pk>/medical_examinations/<int:pk>/",
        views.MedicalExaminationRetrieveUpdateDestroyView.as_view(),
        name="examination-detail",
    ),
]
