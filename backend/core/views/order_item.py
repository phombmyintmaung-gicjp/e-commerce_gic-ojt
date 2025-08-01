from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Order, OrderItem, Customer
from ..serializers import OrderItemListSerializer, OrderItemCreateSerializer, OrderItemUpdateSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_classes = {        
        'retrieve': OrderItemListSerializer,
        'create': OrderItemCreateSerializer,
        'update': OrderItemUpdateSerializer,
        'partial_update': OrderItemUpdateSerializer,
        'destroy': OrderItemListSerializer,
    }
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, OrderItemListSerializer)

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):        
        user = self.request.user
        
        if user.is_staff:
            return OrderItem.objects.all()
        else:
            order = Order.objects.filter(user = user)
            return OrderItem.objects.filter(order = order)


