from rest_framework import serializers
from .models import Staff


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = [
            "id",
            "username",
            "password",
            "nfc",
            "first_name",
            "last_name",
            "role",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "nfc": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        nfc = validated_data.pop("nfc")
        user = Staff(**validated_data)
        user.set_password(password)
        user.set_nfc(nfc)
        user.save()
        return user
