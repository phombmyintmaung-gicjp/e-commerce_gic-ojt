from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import PaymentMethod
from ..serializers import PaymentMethodListSerializer, PaymentMethodCreateSerializer, PaymentMethodUpdateSerializer


class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_classes = {
        'list': PaymentMethodListSerializer,
        'retrieve': PaymentMethodListSerializer,
        'create': PaymentMethodCreateSerializer,
        'update': PaymentMethodUpdateSerializer,
        'partial_update': PaymentMethodUpdateSerializer,
        'destroy': PaymentMethodListSerializer,
    }

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['title'] # Example filters
    # search_fields = ['title']
    # ordering_fields = ['title', 'created_at']
    # ordering = ['-title'] # Default ordering
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, PaymentMethodListSerializer)

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return self.queryset
    