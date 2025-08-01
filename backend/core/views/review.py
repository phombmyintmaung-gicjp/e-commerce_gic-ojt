from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash

from ..models import Customer, Review, Product
from ..serializers import ReviewListSerializer, ReviewCreateSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_classes = {
        'list': ReviewListSerializer,
        'retrieve': ReviewListSerializer,
        'create': ReviewCreateSerializer        
    }
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, ReviewListSerializer)

    def get_permissions(self):
        if self.action in ['partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return self.queryset
    