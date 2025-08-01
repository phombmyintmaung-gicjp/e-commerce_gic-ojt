from rest_framework import serializers
from ..models import Cart, CartItem, Customer

class CartItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = '__all__'
        
class CartItemCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CartItem
        fields = ['product', 'variant', 'quantity', 'cart', 'created_at', 'updated_at']
        read_only_fields = ['cart', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            cart = Cart.objects.filter(user = user).first()
            validated_data['cart'] = cart
            
        return CartItem.objects.create(**validated_data)
    
    # if there is no cart in user and user click add to cart
    # it will create cart and add cartitem to cart
    
    
    
class CartItemUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CartItem
        fields = '__all__'
        read_only_fields = ['cart', 'product', 'variant', 'created_at', 'updated_at' ]
    
    # def update(self, instance, validated_data):
    #     request = self.context.get('request')
    #     if request:
    #         user = request.user
    #         instance.updated_by = user
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)  
    #     instance.save()
    #     return instance