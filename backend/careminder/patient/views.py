from rest_framework import generics
from careminder.permissions import CustomDjangoModelPermissions
from .models import Patient, MedicalExamination
from .serializers import PatientSerializer, MedicalExaminationSerializer


class PatientListCreateView(generics.ListCreateAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class MedicalExaminationListCreateView(generics.ListCreateAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
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
    permission_classes = [CustomDjangoModelPermissions]
    serializer_class = MedicalExaminationSerializer

    def get_queryset(self):
        patient_id = self.kwargs["patient_pk"]
        return MedicalExamination.objects.filter(patient__id=patient_id)
