from rest_framework import generics
from rest_framework.permissions import DjangoModelPermissions
from .models import Request
from .serializers import RequestSerializer


class RequestListCreateView(generics.ListCreateAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class RequestRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [DjangoModelPermissions]
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
