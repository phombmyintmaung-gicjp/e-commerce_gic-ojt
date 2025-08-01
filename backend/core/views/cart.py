from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Cart, Customer
from ..serializers import CartListSerializer, CartCreateSerializer, CartUpdateSerializer

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_classes = {        
        'retrieve': CartListSerializer,
        'create': CartCreateSerializer,
        'update': CartUpdateSerializer,
        'partial_update': CartUpdateSerializer,
        'destroy': CartListSerializer,
    }
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, CartListSerializer)

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):        
        user = self.request.user
        return Cart.objects.filter(user=user)

