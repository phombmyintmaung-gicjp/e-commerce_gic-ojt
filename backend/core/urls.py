from django.urls import path, include
from . import views
from rest_framework import routers
from .views import (
    CustomerViewSet,
    CategoryViewSet,
    ProductViewSet,
    ProductVariantViewSet,
    InventoryViewSet,
    ProductInventoryViewSet,
    CartViewSet,
    CartItemViewSet,
    OrderViewSet,
    OrderItemViewSet,
    ShippingAddressViewSet,
    ReviewViewSet,
    PaymentMethodViewSet,
    PaymentViewSet,
    ShippingFeeViewSet, 
    UserMeViewSet
)
router = routers.DefaultRouter()

router.register(r'customers', CustomerViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'productVariants', ProductVariantViewSet)
router.register(r'inventory', InventoryViewSet)
router.register(r'cart', CartViewSet)
router.register(r'cartItem', CartItemViewSet)
router.register(r'order', OrderViewSet)
router.register(r'orderItem', OrderItemViewSet)
router.register(r'shippingAddress', ShippingAddressViewSet)
router.register(r'review', ReviewViewSet)
router.register(r'paymentMethod', PaymentMethodViewSet)
router.register(r'payment', PaymentViewSet)
router.register(r'shippingfee', ShippingFeeViewSet)


# router.register(r'productInvetory', ProductInventoryViewSet)


urlpatterns = [
    path('api/', include(router.urls)), 
    path('api/productInventory/', 
         ProductInventoryViewSet.as_view({'get': 'list'})),
    path('api/productInventory/<int:product_pk>/', 
         ProductInventoryViewSet.as_view({'get': 'retrieve'})),
    # path('api/auth/login-basic/', views.basic_auth_login_view, name='api_login_basic'),    
    path('api/user/me/', UserMeViewSet.as_view(), name='user-me'),
]