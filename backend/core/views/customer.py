
from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import update_session_auth_hash # For password change
# Import your models and serializers
from ..models import Customer, Township, Region
from ..serializers import (
    CustomerListSerializer, CustomerDetailSerializer,
    CustomerCreateSerializer, CustomerUpdateSerializer, ChangePasswordSerializer
)


class CustomerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Customer model.
    Handles list, create, retrieve, update, partial_update, and destroy actions.
    Assumes users can only view/edit their own details unless they are staff/admin.
    Staff/Admin can perform all actions on any user.
    """
    queryset = Customer.objects.all()
    serializer_classes = {
        'list': CustomerListSerializer,
        'retrieve': CustomerDetailSerializer,
        'create': CustomerCreateSerializer,
        'update': CustomerUpdateSerializer,
        'partial_update': CustomerUpdateSerializer,
        # Add 'change_password' action if you implement it
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active', 'township'] # Example filters
    search_fields = ['username', 'first_name', 'last_name', 'email']
    ordering_fields = ['date_joined', 'username', 'first_name']
    ordering = ['-date_joined'] # Default ordering

    def get_serializer_class(self):
        """Return the serializer class based on the action."""
        return self.serializer_classes.get(self.action, CustomerDetailSerializer)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        - AllowAny for creation (if open registration).
        - IsAuthenticated for list/retrieve/update/partial_update/destroy.
        - Users can only access their own data for retrieve/update/partial_update/destroy,
          unless they are staff.
        """
        if self.action == 'create':
            # Allow anyone to create an account (adjust permission_classes as needed)
            permission_classes = [] # Or [permissions.AllowAny] if explicitly set
        else:
            # All other actions require authentication
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Optionally override to customize the queryset.
        - Non-staff users can only see their own profile in list/retrieve.
        - Staff users can see all users.
        """
        user = self.request.user
        if self.action in ['list', 'retrieve']:
            if user.is_staff:
                return Customer.objects.all()
            else:
                # Non-staff users can only see their own profile
                return Customer.objects.filter(pk=user.pk)
        # For update/partial_update/destroy, DRF's has_object_permission usually handles it
        # But you can also filter here if needed
        return Customer.objects.all() # Default for other actions

    # Override perform_create if needed (e.g., to set created_by if tracking)
    # def perform_create(self, serializer):
    #     serializer.save()

    # Override perform_update if needed (e.g., to set updated_by if tracking)
    # def perform_update(self, serializer):
    #     serializer.save()

    # Example of a custom action for password change
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated], url_path='change-password')
    def change_password(self, request, pk=None):
        user = self.get_object()
        # Check if the requesting user is the owner or staff
        if user != request.user and not request.user.is_staff:
            return Response({'error': 'You do not have permission to change this password.'}, status=status.HTTP_403_FORBIDDEN)

        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            # Update session hash to prevent logout after password change
            update_session_auth_hash(request, user)
            return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import UserMeSerializer

class UserMeViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserMeSerializer(request.user)
        return Response(serializer.data)