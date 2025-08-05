from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from ..models import Customer, Township, Region # Adjust import path if needed

# --- Serializers for RESPONSE (Output) ---

class CustomerListSerializer(serializers.ModelSerializer):
    """Serializer for listing Customers (simplified data)."""
    # Optionally include related object names instead of just IDs
    township_name = serializers.CharField(source='township.name', read_only=True)
    region_name = serializers.CharField(source='region.name', read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email',
            'township', 'township_name', 'region_name',
            'is_active', 'date_joined', 'is_staff', 'is_superuser'
        ]
        # 'date_joined' is from AbstractUser

class CustomerDetailSerializer(serializers.ModelSerializer):
    """Serializer for detailed Customer view."""
    # Include related object names
    township_name = serializers.CharField(source='township.name', read_only=True)
    region_name = serializers.SerializerMethodField()
    # Include full related object details if needed (alternatively to just names)
    # township = TownshipSerializer(read_only=True) 
    # region = RegionSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email',
            'address', 'township_name', 'region_name',
            'phone_number', 'is_active', 'date_joined', 'last_login'
        ]
        read_only_fields = ['id', 'date_joined', 'last_login'] # These are managed by Django
    
    def get_region_name(self):
        return self.township.region.name

# --- Serializers for REQUEST (Input) ---

class CustomerCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating a new Customer."""
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True) # For confirmation
    
    # Accept Township and Region IDs during creation
    township = serializers.PrimaryKeyRelatedField(queryset=Township.objects.all(), required=False)

    class Meta:
        model = Customer
        fields = [
            'username', 'first_name', 'last_name', 'email',
            'password', 'password2', 'address',
            'township', 'phone_number'
        ]

    def validate(self, attrs):
        """Custom validation."""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # You could add more validation here, e.g., check if township belongs to region
        # if attrs['township'].region != attrs['region']:
        #     raise serializers.ValidationError({"township": "Township must belong to the selected region."})
        
        return attrs

    def create(self, validated_data):
        """Create and return a new Customer instance."""
        # Remove password2 as it's not needed for creation
        validated_data.pop('password2')
        password = validated_data.pop('password')
        
        # Create the user instance
        user = Customer(**validated_data)
        # Set the password securely
        user.set_password(password)
        user.save()
        
        return user

# --- Optional: Update Serializer ---
# If you need a specific serializer for updates (might allow changing password separately, etc.)

class CustomerUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating Customer details (excluding password)."""
    
    # Allow updating Township and Region
    township = serializers.PrimaryKeyRelatedField(queryset=Township.objects.all(), required=False) # Make optional for update?
   
    class Meta:
        model = Customer
        fields = [
            'first_name', 'last_name', 'email',
            'address', 'township', 'phone_number'           
        ]       

# --- Optional: Password Change Serializer ---
# from rest_framework_simplejwt.tokens import RefreshToken # If using JWT

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is not correct")
        return value

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "New password fields didn't match."})
        if attrs['old_password'] == attrs['new_password']:
            raise serializers.ValidationError({"new_password": "New password cannot be the same as the old password."})
        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        # If using JWT, you might want to blacklist the old token
        # try:
        #     refresh_token = self.context['request'].META.get('HTTP_AUTHORIZATION').split(' ')[1]
        #     token = RefreshToken(refresh_token)
        #     token.blacklist()
        # except Exception:
        #     pass # Handle token blacklisting errors if necessary
        return user

class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']