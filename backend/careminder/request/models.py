from http.client import PROCESSING

from django.core.validators import MaxValueValidator
from django.db import models

from staff.models import Role
from tablet.models import Tablet


class Request(models.Model):
    class State(models.IntegerChoices):
        WAITING = 0, "Waiting"
        PROCESSING = 1, "Processing"
        FINISHED = 2, "Finished"

    text = models.TextField()
    recording = models.BinaryField(null=True)
    for_role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)
    is_question = models.BooleanField()
    state = models.IntegerField(choices=State.choices, default=State.WAITING)
    time = models.DateTimeField(auto_now_add=True)
    response = models.TextField(null=True, blank=True)
    response_time = models.DateTimeField(null=True)
    tablet = models.ForeignKey(Tablet, on_delete=models.SET_NULL, null=True)
