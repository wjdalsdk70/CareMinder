from django.db import models


class Role(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Staff(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    nfc = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
