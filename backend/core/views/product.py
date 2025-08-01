from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash
from django.utils import timezone
from ..models import Customer, Category, Product, OrderItem, Review
from ..serializers import ProductInventorySerializer, ProductListSerializer, ProductCreateSerializer, ProductUpdateSerializer
from datetime import timedelta
from django.db.models import Count, Sum, Avg, Q

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_classes = {
        'list': ProductListSerializer,
        'retrieve': ProductListSerializer,
        'create': ProductCreateSerializer,
        'update': ProductUpdateSerializer,
        'partial_update': ProductUpdateSerializer,
        'destroy': ProductListSerializer,
    }
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'is_active', 'price'] 
    search_fields = ['title', 'category', 'description', 'attributes']
    ordering_fields = ['title', 'category']
    ordering = ['-title']
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, ProductListSerializer)
    
    def get_permissions(self):
        if self.action in ['create', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        return self.queryset
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated], url_path='recommended')
    def recommended(self, request):
        
        user = request.user
        # --- Logic: Recommend popular products in categories user bought from ---
        user_ordered_categories = OrderItem.objects.filter(
            order__user=user
        ).select_related('product__category').values_list('product__category_id', flat=True).distinct()

        # Get popular products (e.g., by review count) in these categories
        from django.db.models import Count
        recommended_products = Product.objects.filter(
            category_id__in=user_ordered_categories,
            is_active=True
        ).annotate(
            num_reviews=Count('review') # Assuming Review model exists
        ).order_by('-num_reviews')[:20] # Top 20

        serializer = self.get_serializer(recommended_products, many=True)
        return Response(serializer.data)
    # --- End of Recommended Action ---

    # --- Custom Action for Trending Products ---
    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny], url_path='trending')
    def trending(self, request):
        """
        Get trending products based on recent sales quantity.
        """
        # Define the time window (e.g., last 30 days)
        timeframe = timezone.now() - timedelta(days=30)

        # Get product IDs and total quantities ordered in the timeframe
        trending_data = OrderItem.objects.filter(
            order__created_at__gte=timeframe
        ).values('product_id').annotate(
            total_quantity=Sum('quantity')
        ).order_by('-total_quantity')[:20] # Top 20 trending by quantity

        # Extract product IDs
        trending_product_ids = [item['product_id'] for item in trending_data]

        # Efficiently get products and preserve order
        products_dict = Product.objects.filter(
            id__in=trending_product_ids,
            is_active=True
        ).in_bulk()

        # Sort products based on the order of IDs from the annotation
        sorted_products = [
            products_dict[pid] for pid in trending_product_ids if pid in products_dict
        ]

        serializer = self.get_serializer(sorted_products, many=True)
        return Response(serializer.data)
    
class ProductInventoryViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_classes = {
        'list': ProductInventorySerializer,
        'retrieve': ProductInventorySerializer,        
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['product_id', 'low_stock_limit'] 
    # search_fields = ['product_id', 'product_name']
    # ordering_fields = ['product_id', 'product_name']
    # ordering = ['-product_id']
    
    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, ProductInventorySerializer)
    
    def get_permissions(self):
        if self.action in ['create', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]        
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]        
    
    def get_queryset(self):
        return self.queryset