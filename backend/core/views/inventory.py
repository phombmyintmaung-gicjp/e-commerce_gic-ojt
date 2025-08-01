from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash
from django.core.exceptions import ValidationError
from ..models import Product, ProductVariant, Inventory
from ..serializers import InventoryListSerializer, InventoryCreateSerializer, InventoryUpdateSerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_classes = {
        'list': InventoryListSerializer,
        'retrieve': InventoryListSerializer,
        'create': InventoryCreateSerializer,
        'update': InventoryUpdateSerializer,
        'partial_update': InventoryUpdateSerializer        
    }
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['variant', 'product', 'low_stock_threshold'] 
    search_fields = ['variant', 'product']
    ordering_fields = ['product', 'variant', 'quantity']
    ordering = ['-product']
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, InventoryListSerializer)
    
    def get_permissions(self):
        if self.action in ['create', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]        
    
    def get_queryset(self):
        return self.queryset
    
    def update(self, request, *args, **kwargs):
        try:
            response = super().update(request, *args, **kwargs)
            return response
        except ValidationError as e:
            # ValidationError messages can be a list or a dict
            # Customize the JSON structure as needed
            error_message = " ".join(e.messages) if hasattr(e, 'messages') else str(e)
            return Response(
                {
                    'error': 'Validation Error', # Or 'Inventory Error'
                    'message': error_message,
                    # Optionally include more details if e.message_dict exists
                    # 'details': getattr(e, 'message_dict', {})
                },
                status=status.HTTP_400_BAD_REQUEST 
            )

