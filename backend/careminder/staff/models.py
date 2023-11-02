from os import name
from django.db import models
from django.contrib.auth.models import AbstractBaseUser


class Role(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Staff(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    nfc = models.IntegerField(null=True)

    USERNAME_FIELD = "username"

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"

    @property
    def is_staff(self):
        """
        Checks if the Staff member is an 'ADMIN'.

        :return: True if the Staff member's role is 'ADMIN', False otherwise.
        """
        return self.role == Role.objects.filter(name="ADMIN").first()
