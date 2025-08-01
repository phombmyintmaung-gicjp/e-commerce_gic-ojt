from rest_framework import serializers
from ..models import Cart, Customer, CartItem, Product, ProductVariant
from .cart_item import CartItemListSerializer

class CartListSerializer(serializers.ModelSerializer):
    cart_items = serializers.SerializerMethodField()
    grand_total = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['user', 'grand_total', 'cart_items']
        
    def get_cart_items(self, obj):
        cart_items_data = []
        try:
            for cart_item in CartItem.objects.filter(cart=obj): # Uses the 'variants' related_name
                                            
                name = cart_item.product.title
                variant = cart_item.variant
                variant_name = ''
                price = cart_item.product.get_discounted_price()
                if variant:
                    variant_name = variant.get_variant_display()
                    price = variant.get_final_price()
                cart_item_info = {
                    'product_name' : name,
                    'variant': variant_name, 
                    'quantity': cart_item.quantity, 
                    'price': price,
                    'total_price' : price * cart_item.quantity              
                }
                cart_items_data.append(cart_item_info)
        except Cart.DoesNotExist:              
            pass         
        return cart_items_data

    def get_grand_total(self, obj):
        grandtotal = 0
        try:
            for cart_item in CartItem.objects.filter(cart=obj): # Uses the 'variants' related_name
                
                variant = ProductVariant.objects.filter(product=cart_item.product).first()
                
                price = cart_item.product.get_discounted_price()
                if variant:
                    variant_name = variant.get_variant_display()
                    price = variant.get_final_price()
                total_price = price * cart_item.quantity 
                grandtotal += total_price   
                
        except Cart.DoesNotExist:              
            pass         
        return grandtotal
        
class CartCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cart
        fields = '__all__'
        read_only_fields = ['user']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user
            validated_data['user'] = user
            
        return Cart.objects.create(**validated_data)
    
class CartUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cart
        fields = '__all__'
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            instance.updated_by = user
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  
        instance.save()
        return instance