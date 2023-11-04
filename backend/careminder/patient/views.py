from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissions
from .models import Patient, MedicalExamination
from .serializers import PatientSerializer, MedicalExaminationSerializer


class PatientListCreateView(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class MedicalExaminationListCreateView(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissions]
    serializer_class = MedicalExaminationSerializer

    def get_queryset(self):
        patient_id = self.kwargs["patient_pk"]
        return MedicalExamination.objects.filter(patient__id=patient_id)

    def perform_create(self, serializer):
        patient = Patient.objects.get(pk=self.kwargs["patient_pk"])
        serializer.save(patient=patient)


class MedicalExaminationRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView
):
    permission_classes = [DjangoModelPermissions]
    serializer_class = MedicalExaminationSerializer

    def get_queryset(self):
        patient_id = self.kwargs["patient_pk"]
        return MedicalExamination.objects.filter(patient__id=patient_id)
