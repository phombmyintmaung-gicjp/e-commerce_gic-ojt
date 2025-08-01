from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import ShippingAddress, Customer
from ..serializers import ShippingAddressListSerializer, ShippingAddressCreateSerializer, ShippingAddressUpdateSerializer


class ShippingAddressViewSet(viewsets.ModelViewSet):
    queryset = ShippingAddress.objects.all()
    serializer_classes = {
        'list': ShippingAddressListSerializer,
        'retrieve': ShippingAddressListSerializer,
        'create': ShippingAddressCreateSerializer,
        'update': ShippingAddressUpdateSerializer,
        'partial_update': ShippingAddressUpdateSerializer,
        'destroy': ShippingAddressListSerializer,
    }

    # filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['title'] # Example filters
    # search_fields = ['title']
    # ordering_fields = ['title', 'created_at']
    ordering = ['-created_at'] # Default ordering
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, ShippingAddressListSerializer)

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user
        return ShippingAddress.objects.filter(customer=user)
    