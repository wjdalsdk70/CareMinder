from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password
from rest_framework import generics, status
from rest_framework.response import Response

from careminder.permissions import CustomDjangoModelPermissions
from staff.permissions import (
    IsUserOrHasCustomModelPermissions,
)
from .models import Staff
from .serializers import StaffSerializer


class LoginView(generics.GenericAPIView):
    serializer_class = StaffSerializer

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        nfc = request.data.get("nfc")

        # authenticate user
        if username and password:
            user = authenticate(request, username=username, password=password)
        elif nfc:
            try:
                user = Staff.objects.get(nfc=make_password(nfc))
            except Staff.DoesNotExist:
                user = None
        else:
            return Response(
                {"detail": "Must provide either username and password or NFC tag."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user is None:
            return Response(
                {"detail": "Invalid login credentials."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        login(request, user)
        return Response({"detail": "Login successful."})


class StaffListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class StaffRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        IsUserOrHasCustomModelPermissions,
    ]
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
