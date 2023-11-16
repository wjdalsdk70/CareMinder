from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password


class Staff(AbstractUser):
    class Role(models.IntegerChoices):
        SECRETARY = 0, "Secretary"
        CAREWORKER = (
            1,
            "Careworker",
        )

    class Type(models.IntegerChoices):
        HELPER = 0, "Helper"
        NURSE = 1, "Nurse"
        DOCTOR = 2, "Doctor"

    nfc = models.CharField(null=True, max_length=256)
    role = models.PositiveSmallIntegerField(null=True, choices=Role.choices)
    type = models.PositiveSmallIntegerField(null=True, choices=Type.choices)

    USERNAME_FIELD = "username"

    def set_nfc(self, nfc: str):
        self.nfc = make_password(nfc)
