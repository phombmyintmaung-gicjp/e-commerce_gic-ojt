from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Cart, CartItem, Customer
from ..serializers import CartItemListSerializer, CartItemCreateSerializer, CartItemUpdateSerializer

class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_classes = {        
        'retrieve': CartItemListSerializer,
        'create': CartItemCreateSerializer,
        'update': CartItemUpdateSerializer,
        'partial_update': CartItemUpdateSerializer,
        'destroy': CartItemListSerializer,
    }
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, CartItemListSerializer)

    def get_permissions(self):
        permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):        
        user = self.request.user
        cart = Cart.objects.filter(user = user).first()
        return CartItem.objects.filter(cart = cart)

