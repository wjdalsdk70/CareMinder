from rest_framework import generics
from careminder.permissions import CustomDjangoModelPermissions
from .models import Request
from .serializers import RequestSerializer


class RequestListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class RequestRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomDjangoModelPermissions]
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
