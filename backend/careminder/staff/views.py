from rest_framework import generics
from .models import Staff, Role
from .serializers import StaffSerializer, RoleSerializer


class StaffListCreateView(generics.ListCreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class StaffRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer


class RoleRetrieveView(generics.RetrieveAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
