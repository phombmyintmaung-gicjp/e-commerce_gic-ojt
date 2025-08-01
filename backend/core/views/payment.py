from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash
from django.core.exceptions import ValidationError
from ..models import Payment, Order
from ..serializers import PaymentListSerializer, PaymentCreateSerializer

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_classes = {
        'list': PaymentListSerializer,
        'retrieve': PaymentListSerializer,
        'create': PaymentCreateSerializer
    }
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, PaymentListSerializer)
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]        
    
    def get_queryset(self):        
        user = self.request.user
        if self.action in ['list', 'retrieve']:
            if user.is_staff:
                return Payment.objects.all()
            else:
                order = Order.objects.filter(user = user)
                # Non-staff users can only see their own profile
                return Payment.objects.filter(order__in= order)
        # For update/partial_update/destroy, DRF's has_object_permission usually handles it
        # But you can also filter here if needed
        return Payment.objects.all() 
    
    
