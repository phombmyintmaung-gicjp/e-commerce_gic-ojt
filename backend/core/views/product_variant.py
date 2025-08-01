from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Product, ProductVariant
from ..serializers import ProductVariantsListSerializer, ProductVariantCreateSerializer, ProductVariantUpdateSerializer

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_classes = {
        'list': ProductVariantsListSerializer,
        'retrieve': ProductVariantsListSerializer,
        'create': ProductVariantCreateSerializer,
        'update': ProductVariantUpdateSerializer,
        'partial_update': ProductVariantUpdateSerializer,
        'destroy': ProductVariantsListSerializer,
    }
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['product', 'is_active', 'price'] 
    # search_fields = ['title', 'category', 'description', 'attributes']
    # ordering_fields = ['title', 'category']
    ordering = ['-size']
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, ProductVariantsListSerializer)
    
    def get_permissions(self):
        if self.action in ['create', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        return self.queryset