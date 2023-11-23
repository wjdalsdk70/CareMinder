import uuid
from django.db import models

from patient.models import Patient
from staff.models import Staff


class Tablet(models.Model):
    # uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    patient = models.ForeignKey(
        Patient, related_name="tablets", on_delete=models.SET_NULL, null=True
    )
    room = models.CharField(max_length=255)
    doctor = models.ForeignKey(
        Staff, related_name="doctor_tablets", on_delete=models.SET_NULL, null=True
    )
    nurse = models.ForeignKey(
        Staff, related_name="nurse_tablets", on_delete=models.SET_NULL, null=True
    )

    def __str__(self) -> str:
        return f"{self.room}"
