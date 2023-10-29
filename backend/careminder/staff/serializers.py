# staff.serializers
from rest_framework import serializers
from .models import Staff, Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = [
            "id",
            "name",
        ]


class StaffSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), write_only=True, source="role"
    )

    class Meta:
        model = Staff
        fields = [
            "id",
            "first_name",
            "last_name",
            "role",
            "role_id",
            "nfc",
        ]
