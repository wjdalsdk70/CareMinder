from http.client import PROCESSING

from django.core.validators import MaxValueValidator
from django.db import models


class Request(models.Model):
    class State(models.IntegerChoices):
        WAITING = 0, "Waiting"
        PROCESSING = 1, "Processing"
        FINISHED = 2, "Finished"

    text = models.TextField(null=False)
    recording = models.BinaryField(null=False)
    tablet = models.IntegerField(null=False)
    for_role = models.IntegerField(validators=[MaxValueValidator(3)])
    is_question = models.BooleanField(null=False)
    time = models.DateTimeField(null=False)
    state = models.IntegerField(
        choices=State.choices, default=State.WAITING
    )
    response = models.TextField(null=True, blank=True)
    response_time = models.DateTimeField(null=True, blank=True)

