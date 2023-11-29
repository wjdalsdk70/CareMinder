from rest_framework import generics
from careminder.permissions import CustomDjangoModelPermissions
import request
from .models import Request, ChatMessage
from .serializers import ChatMessageSerializer, RequestSerializer


class RequestListCreateView(generics.ListCreateAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class RequestRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class ChatMessageListCreateView(generics.ListCreateAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        request_id = self.kwargs["request_pk"]
        return ChatMessage.objects.filter(request__id=request_id)

    def perform_create(self, serializer):
        request = Request.objects.get(pk=self.kwargs["request_pk"])
        serializer.save(request=request)


class ChatMessageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [CustomDjangoModelPermissions]
    queryset = ChatMessage.objects.all()
    serializer_class = RequestSerializer

    def get_queryset(self):
        request_id = self.kwargs["request_pk"]
        return ChatMessage.objects.filter(request__id=request_id)
