from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer


class PatientListView(generics.ListAPIView):
    """
    View to list all patients in the system.
    """

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientCreateView(generics.CreateAPIView):
    """
    View to create a new patient in the system.
    """

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update or delete a patient instance.
    """

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
