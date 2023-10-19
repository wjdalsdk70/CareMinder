from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)\

    def __str__(self):
        return self.name

