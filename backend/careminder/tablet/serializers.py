from rest_framework import serializers
from patient.models import Patient

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from patient.serializers import PatientSerializer
from staff.models import Staff
from staff.serializers import StaffSerializer
from rest_framework import exceptions

from .models import Tablet


class TabletSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(),
        write_only=True,
        source="patient",
        required=False,
    )
    doctor = StaffSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.all(),
        write_only=True,
        source="doctor",
        required=False,
    )
    nurse = StaffSerializer(read_only=True)
    nurse_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.all(),
        write_only=True,
        source="nurse",
        required=False,
    )

    class Meta:
        model = Tablet
        fields = [
            "id",
            "patient",
            "patient_id",
            "room",
            "doctor",
            "doctor_id",
            "nurse",
            "nurse_id",
        ]
