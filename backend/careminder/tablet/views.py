from rest_framework import generics
from careminder.permissions import CustomDjangoModelPermissions

from tablet.serializers import TabletSerializer

from .models import Tablet


class TabletListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer


class TabletRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer
