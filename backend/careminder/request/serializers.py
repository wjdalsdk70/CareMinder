from rest_framework import serializers
from staff.models import Staff
from tablet.models import Tablet
from .models import ChatMessage, Request
from django.db.models import Q


class RequestSerializer(serializers.ModelSerializer):
    tablet_id = serializers.PrimaryKeyRelatedField(
        queryset=Tablet.objects.all(),
        source="tablet",
    )

    staff_id = serializers.PrimaryKeyRelatedField(
        queryset=Staff.objects.all(),
        source="staff",
        required=False,
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
            "staff_id",
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
