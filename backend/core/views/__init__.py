from .customer import CustomerViewSet, UserMeViewSet
from .category import CategoryViewSet
from .product import ProductViewSet, ProductInventoryViewSet
from .product_variant import ProductVariantViewSet
from .inventory import InventoryViewSet
from .cart import CartViewSet
from .cart_item import CartItemViewSet
from .order import OrderViewSet
from .order_item import OrderItemViewSet
from .shipping_address import ShippingAddressViewSet
from .review import ReviewViewSet
from .payment_method import PaymentMethodViewSet
from .payment import PaymentViewSet
from .shippingfee import ShippingFeeViewSet
from .regions import RegionsListViewSet
from .townships import TownshipsListViewSet
__all__ = [
    'UserMeViewSet',
    'CustomerViewSet',
    'CategoryViewSet',
    'ProductViewSet',
    'ProductVariantViewSet',
    'InventoryViewSet',
    'ProductInventoryViewSet',
    'CartViewSet',
    'CartItemViewSet',
    'OrderViewSet',
    'OrderItemViewSet',
    'ShippingAddressViewSet',
    'ReviewViewSet',
    'PaymentMethodViewSet',
    'PaymentViewSet',
    'ShippingFeeViewSet',
    'RegionsListViewSet',
    'TownshipsListViewSet'
]

# # views.py

# import base64
# import binascii # For handling decoding errors
# from django.contrib.auth import authenticate
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from rest_framework.response import Response
# from rest_framework import status
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def basic_auth_login_view(request):
#     """
#     API endpoint for user login using HTTP Basic Authentication.
#     Expects 'Authorization: Basic <base64encoded(username:password)>' header.
#     Returns user details (and optionally a token) on success.
#     """
#     # --- Extract Authorization Header ---
#     auth_header = request.META.get('HTTP_AUTHORIZATION')
#     if not auth_header or not auth_header.startswith('Basic '):
#         return Response(
#             {'error': 'Missing or invalid Authorization header. Expected "Basic <credentials>".'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # --- Decode Base64 Credentials ---
#     encoded_credentials = auth_header.split(' ', 1)[1] # Get the part after 'Basic '
#     try:
#         # Decode the base64 string
#         decoded_credentials_bytes = base64.b64decode(encoded_credentials)
#         # Convert bytes to string (assuming UTF-8 encoding)
#         decoded_credentials = decoded_credentials_bytes.decode('utf-8')
#     except (binascii.Error, UnicodeDecodeError):
#         return Response(
#             {'error': 'Invalid Base64 encoding in Authorization header.'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     # --- Split Username and Password ---
#     credentials_parts = decoded_credentials.split(':', 1)
#     if len(credentials_parts) != 2:
#         return Response(
#             {'error': 'Invalid credentials format in Authorization header. Expected "username:password".'},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     username = credentials_parts[0]
#     password = credentials_parts[1]

#     # --- Authenticate the User ---
#     user = authenticate(request, username=username, password=password)

#     if user is not None:
#         # Authentication successful

#         # --- (Optional) Generate/Get Token for subsequent requests ---
#         # If you still want to return a token for the client to use later
#         # with TokenAuthentication:
#         # token, created = Token.objects.get_or_create(user=user)
#         # token_key = token.key
#         # ---

#         # Return user information
#         user_data = {
#             'user_id': user.id,
#             'username': user.username,
#             'email': user.email,
#             'first_name': user.first_name,
#             'last_name': user.last_name,
#             # 'token': token_key, # Include if using tokens
#             # 'auth_method': 'basic' # Indicate how login was done if relevant
#         }

#         return Response(user_data, status=status.HTTP_200_OK)

#     else:
#         # Authentication failed
#         print('error')
#         return Response(
#             {'error': 'Invalid username or password.'},
#             status=status.HTTP_401_UNAUTHORIZED # Standard for auth failure
#         )
