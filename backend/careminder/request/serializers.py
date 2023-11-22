from rest_framework import serializers
import request
from tablet.models import Tablet
from tablet.serializers import TabletSerializer
from .models import ChatMessage, Request


class RequestSerializer(serializers.ModelSerializer):
    tablet_id = serializers.PrimaryKeyRelatedField(
        queryset=Tablet.objects.all(),
        source="tablet",
    )

    class Meta:
        model = Request
        fields = [
            "id",
            "text",
            "recording",
            "for_role",
            "is_question",
            "state",
            "time",
            "response",
            "response_time",
            "tablet_id",
        ]


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = [
            "id",
            "text",
            "time",
            "from_patient",
        ]
