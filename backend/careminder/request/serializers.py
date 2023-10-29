
from rest_framework import serializers
from .models import Request


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = [
            'id',
            'text',
            'recording',
            'tablet',
            'for_role',
            'is_question',
            'time',
            'state',
            'response',
            'response_time',
        ]
