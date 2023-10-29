from rest_framework import generics

from tablet.serializers import TabletSerializer

from .models import Tablet


class TabletListCreateView(generics.ListCreateAPIView):
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer


class TabletRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tablet.objects.all()
    serializer_class = TabletSerializer
