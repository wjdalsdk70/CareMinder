# patient.serializer
from rest_framework import serializers
from .models import Patient, MedicalExamination


class MedicalExaminationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalExamination
        fields = [
            "id",
            "name",
            "state",
            "time",
        ]


class PatientSerializer(serializers.ModelSerializer):
    medical_examinations = MedicalExaminationSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = [
            "id",
            "first_name",
            "last_name",
            "age",
            "doctor_first_visit",
            "hospitalization",
            "medical_examinations",
        ]
