from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import ShippingFee
from ..serializers import ShippingFeeListSerializer, ShippingFeeCreateSerializer, ShippingFeeUpdateSerializer


class ShippingFeeViewSet(viewsets.ModelViewSet):
    queryset = ShippingFee.objects.all()
    serializer_classes = {
        'list': ShippingFeeListSerializer,
        'retrieve': ShippingFeeListSerializer,
        'create': ShippingFeeCreateSerializer,
        'update': ShippingFeeUpdateSerializer,
        'partial_update': ShippingFeeUpdateSerializer,
        'destroy': ShippingFeeListSerializer,
    }

    # filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['title'] # Example filters
    # search_fields = ['title']
    # ordering_fields = ['title', 'created_at']
    ordering = ['-created_at'] # Default ordering
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, ShippingFeeListSerializer)

    def get_permissions(self):
        permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return self.queryset
    