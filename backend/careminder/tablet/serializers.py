from rest_framework import serializers
from patient.models import Patient

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from patient.serializers import PatientSerializer
from settings.models import Area
from settings.serializers import AreaSerializer
from staff.models import Staff
from staff.serializers import StaffSerializer
from rest_framework import exceptions

from .models import Tablet


class TabletSerializer(serializers.ModelSerializer):
    # Use PrimaryKeyRelatedField for read mode to show only the ID
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(),
        source="patient",
        required=False,
    )
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.filter(type=Staff.Type.DOCTOR),
        source="doctor",
        required=False,
    )
    nurse_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.filter(type=Staff.Type.NURSE),
        source="nurse",
        required=False,
    )
    area_id = serializers.PrimaryKeyRelatedField(
        queryset=Area.objects.all(),
        source="area",
        required=False,
    )

    class Meta:
        model = Tablet
        fields = [
            "id",
            "name",
            "patient_id",
            "doctor_id",
            "nurse_id",
            "area_id",
        ]
