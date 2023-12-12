import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from .serializers import ChatMessageSerializer, RequestSerializer
from careminder.permissions import CustomDjangoModelPermissions
from .models import Request, ChatMessage


class RequestFilter(django_filters.FilterSet):
    staff_type = django_filters.CharFilter(
        field_name="staff__type", lookup_expr="exact"
    )

    class Meta:
        model = Request
        fields = [
            "for_role",
            "is_question",
            "state",
            "tablet",
            "staff",
        ]


class RequestListCreateView(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = RequestFilter


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
