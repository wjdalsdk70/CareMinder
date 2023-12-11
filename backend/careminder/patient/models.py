from turtle import mode
from django.db import models


class Patient(models.Model):
    class Severity(models.IntegerChoices):
        LOW = 0, "Low"
        MIDDLE = 1, "Middle"
        HIGH = 2, "High"

    class MedicalProgress(models.IntegerChoices):
        WAIT = 0, "Wait"
        CT = 1, "CT"
        XRAY = 2, "X-Ray"
        BLOOD = 3, "Blood"
        DOCTOR_FIRST_VISIT = 4, "Doctor first visit"
        RELEASED = 5, "Out of the hospital"

    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    age = models.IntegerField(null=True)

    severity = models.PositiveSmallIntegerField(
        choices=Severity.choices, default=Severity.LOW
    )
    medical_progress = models.PositiveSmallIntegerField(
        choices=MedicalProgress.choices, default=MedicalProgress.WAIT
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
