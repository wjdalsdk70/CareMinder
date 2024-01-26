from rest_framework import generics
from careminder.permissions import CustomDjangoModelPermissions
from tablet.serializers import TabletSerializer
from .models import Tablet


class TabletListView(generics.ListAPIView):
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer


class TabletRetrieveView(generics.RetrieveAPIView):
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer


class TabletCreateView(generics.CreateAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer


class TabletUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer
