from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password


class Staff(AbstractUser):
    class Role(models.IntegerChoices):
        SECRETARY = 0, "Secretary"
        HELPER = 1, "Helper"
        NURSE = 2, "Nurse"
        DOCTOR = 3, "Doctor"

    role = models.PositiveSmallIntegerField(null=True, choices=Role.choices)
    nfc = models.CharField(null=True, max_length=256)

    USERNAME_FIELD = "username"

    def set_nfc(self, nfc: str):
        self.nfc = make_password(nfc)
