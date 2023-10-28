from http.client import PROCESSING
from django.db import models


class Patient(models.Model):
    class Hospitalization(models.IntegerChoices):
        NOT_HOSPITALIZED = 0, "Not Hospitalized"
        HOSPITALIZED = 1, "Hospitalized"
        CRITICAL = 2, "Critical"

    first_name = models.CharField(max_length=255, null=True)
    last_name = models.CharField(max_length=255, null=True)
    age = models.IntegerField(null=True)
    doctor_first_visit = models.BooleanField(default=False)
    hospitalization = models.IntegerField(
        choices=Hospitalization.choices, default=Hospitalization.NOT_HOSPITALIZED
    )


class MedicalExamination(models.Model):
    class State(models.IntegerChoices):
        WAITING = 0, "Waiting"
        PROCESSING = 1, "Processing"
        FINISHED = 2, "Finished"

    name = models.CharField(max_length=255)
    state = models.IntegerField(choices=State.choices, default=State.WAITING)
    patient = models.ForeignKey(
        Patient, related_name="medical_examinations", on_delete=models.CASCADE
    )
    time = models.DateTimeField(null=True)
