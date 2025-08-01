from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Customer, Category
from ..serializers import CategoryListSerializer, CategoryCreateSerializer, CategoryUpdateSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_classes = {
        'list': CategoryListSerializer,
        'retrieve': CategoryListSerializer,
        'create': CategoryCreateSerializer,
        'update': CategoryUpdateSerializer,
        'partial_update': CategoryUpdateSerializer,
        'destroy': CategoryListSerializer,
    }

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['title'] # Example filters
    search_fields = ['title']
    ordering_fields = ['title', 'created_at']
    ordering = ['-title'] # Default ordering
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, CategoryListSerializer)

    def get_permissions(self):
        if self.action in ['create', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return self.queryset
    