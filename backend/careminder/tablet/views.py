from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissions

from tablet.serializers import TabletSerializer

from .models import Tablet


class TabletListCreateView(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer


class TabletRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer
