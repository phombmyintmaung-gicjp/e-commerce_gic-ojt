from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Order, Customer
from ..serializers import OrderListSerializer, OrderCreateSerializer, OrderUpdateSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_classes = {        
        'retrieve': OrderListSerializer,
        'create': OrderCreateSerializer,
        'update': OrderUpdateSerializer,
        'partial_update': OrderUpdateSerializer,
        'destroy': OrderListSerializer,
    }
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, OrderListSerializer)

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user
        
        if user.is_staff:
            return Order.objects.all()
        else:
            return Order.objects.filter(user = user)

