from rest_framework import serializers
from staff.models import Role

from staff.serializers import RoleSerializer
from .models import Request


class RequestSerializer(serializers.ModelSerializer):
    for_role = RoleSerializer(read_only=True)
    for_role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), write_only=True, source="for_role"
    )

    class Meta:
        model = Request
        fields = [
            "id",
            "text",
            "recording",
            "for_role",
            "for_role_id",
            "is_question",
            "state",
            "time",
            "response",
            "response_time",
            "tablet",  # TODO
        ]
