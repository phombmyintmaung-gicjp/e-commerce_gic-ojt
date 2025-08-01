from rest_framework import serializers
from ..models import Order, OrderItem, Customer

class OrderItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'
        
class OrderItemCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = ['order', 'product', 'variant', 'quantity', 'price_at_purchase', 'created_at', 'updated_at']
        read_only_fields = ['price_at_purchase', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            order = validated_data.get('order')
            product = validated_data.get('product')
            variant = validated_data.get('variant') # This might be None
            quantity = validated_data.get('quantity')
            price = product.get_discounted_price()
            if variant:                
                price = variant.get_final_price()
                    
            total_price = quantity * price
            validated_data['price_at_purchase'] = total_price
            
        return OrderItem.objects.create(**validated_data)
    
    # if there is no cart in user and user click add to cart
    # it will create cart and add cartitem to cart   
    
    
class OrderItemUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = '__all__'
        read_only_fields = ['order', 'product', 'variant', 'created_at', 'updated_at' ]
    
    # def update(self, instance, validated_data):
    #     request = self.context.get('request')
    #     if request:
    #         user = request.user
    #         instance.updated_by = user
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)  
    #     instance.save()
    #     return instance