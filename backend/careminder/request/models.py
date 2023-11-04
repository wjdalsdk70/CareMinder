from http.client import PROCESSING

from django.db import models
from staff.models import Staff

from tablet.models import Tablet


class Request(models.Model):
    class State(models.IntegerChoices):
        WAITING = 0, "Waiting"
        PROCESSING = 1, "Processing"
        FINISHED = 2, "Finished"

    text = models.TextField()
    recording = models.BinaryField(null=True)
    for_role = models.PositiveSmallIntegerField(choices=Staff.Role.choices)
    is_question = models.BooleanField()
    state = models.PositiveSmallIntegerField(
        choices=State.choices, default=State.WAITING
    )
    time = models.DateTimeField(auto_now_add=True)
    response = models.TextField(null=True, blank=True)
    response_time = models.DateTimeField(null=True)
    tablet = models.ForeignKey(Tablet, on_delete=models.SET_NULL, null=True)
