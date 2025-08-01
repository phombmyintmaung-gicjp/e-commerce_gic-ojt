from rest_framework import serializers
from ..models import Payment, Order, OrderItem, ShippingFee
from decimal import Decimal

class PaymentListSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Payment
        fields = '__all__'
    
        
class PaymentCreateSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Payment
        fields = ['id', 'order', 'amount', 'payment_method', 'transaction_image',  'payment_phone_no', 'created_at', 'updated_at', 'created_by', 'updated_by']
        read_only_fields = ['id', 'created_at', 'updated_at', 'created_by', 'updated_by']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user
        order = validated_data['order']
        amount = validated_data['amount']      
            
        return Payment.objects.create(**validated_data)
    
    def validate(self, attrs):
       
        order = attrs.get('order')
        amount = attrs.get('amount')
        payment_method = attrs.get('payment_method') # If you need to validate based on method

        # --- Validation 1: Amount vs Order Total ---
        if order and amount is not None: # Check if both are provided
            if amount < order.grand_total_price:
                raise serializers.ValidationError(
                    f"Payment amount ({amount}) does not match the order total ({order.grand_total_price})."
                )
       
        request = self.context.get('request')
        if request and hasattr(request, 'user') and order:
            if order.user != request.user:
                raise serializers.ValidationError(
                    "You can only create payments for your own orders."
                )

        # --- Validation 3: Duplicate Completed Payment Check ---
        # Similar to model validation, but using serializer context/data
        # This might be redundant if model validation is also in place.
        if order:
            existing_completed = Payment.objects.filter(order=order).exists()
            if existing_completed:
                raise serializers.ValidationError(
                    f"Order {order.id} already has a completed payment."
                )

        # --- Validation 4: Order Status Check ---
        # Example: Only allow payment creation for Pending orders via API
        # if order and order.status != 'Pending':
        #     raise serializers.ValidationError(
        #         f"Cannot create payment for order with status '{order.status}'. Expected 'Pending'."
        #     )

        return attrs
    
    def validate_order(self, value):
       
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user = request.user
                
            if value.status != 'Create':
                raise serializers.ValidationError(
                    "This order is already payed"
                )
            elif not user.is_authenticated:
                raise serializers.ValidationError(
                    "Authentication required to create payment."
                )
            elif value.user != user:
                raise serializers.ValidationError(
                    "You can only create payments for your own orders."
                )
            
        return value
    
# class PaymentUpdateSerializer(serializers.ModelSerializer):    
#     class Meta:
#         model = Payment
#         fields = ['status', 'remark']
        
#     def update(self, instance, validated_data):
#         request = self.context.get('request')
#         if request:
#             user = request.user
#             instance.updated_by = user
           
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)  
#         instance.save()
#         return instance 
    
   