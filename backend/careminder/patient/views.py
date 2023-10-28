# patient.views
from rest_framework import generics
from .models import Patient, MedicalExamination
from .serializers import PatientSerializer, MedicalExaminationSerializer


class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class MedicalExaminationListCreateView(generics.ListCreateAPIView):
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
    serializer_class = MedicalExaminationSerializer

    def get_queryset(self):
        patient_id = self.kwargs["patient_pk"]
        return MedicalExamination.objects.filter(patient__id=patient_id)
