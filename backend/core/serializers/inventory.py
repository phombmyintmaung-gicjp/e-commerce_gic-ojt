from rest_framework import serializers
from ..models import Product, ProductVariant, Inventory
from .product_variant import ProductVariantsListSerializer
from .product import ProductListSerializer
from django.core.exceptions import ValidationError

class InventoryListSerializer(serializers.ModelSerializer):
    
    product_id = serializers.IntegerField(source='product.id')
    product_name = serializers.CharField(source='product.title')
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)  
    low_stock_limit = serializers.SerializerMethodField()
    is_variant = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    
    variants = serializers.SerializerMethodField()
    
    class Meta:
        model = Inventory
        fields = [
            'product_id', 'product_name', 'price', 
            'low_stock_limit', 'is_variant','total','variants'
        ]
    
    def get_low_stock_limit(self, obj):
        try:
            base_inventory = Inventory.objects.get(product=obj.product, is_variant=False)
            return base_inventory.low_stock_threshold
        except Inventory.DoesNotExist:
            return 0
        
    def get_is_variant(self, obj):
        return obj.is_variant
    
    def get_total(self, obj):
        total_available = 0
        
        try:
            base_inventory = Inventory.objects.get(product=obj.product, is_variant=False)
            total_available += base_inventory.quantity()
        except Inventory.DoesNotExist:
            pass
        try:
            inventory_list = Inventory.objects.get(product=obj.product, is_variant=False)
            
            for variant in inventory_list:
                total_available += variant.quantity           
        
        except Inventory.DoesNotExist:
                pass 
        
        return total_available
    
    def get_variants(self, obj):
        variants_data = []
        # for inventory in Inventory.objects.get(product=obj.product, is_variant=True): # Uses the 'variants' related_name
        #     try:                                
        #         price = inventory.variant.get_final_price()                
        #         variant_info = {
        #             'name': inventory.variant.get_variant_display(), 
        #             'price': price, 
        #             'quantity': inventory.quantity, 
        #             'low_stock_limit': inventory.low_stock_threshold,
        #         }
        #         variants_data.append(variant_info)
        #     except Inventory.DoesNotExist:              
        #         pass 
        variant_info = {
                    'name': obj.variant.get_variant_display(), 
                    'price': obj.variant.get_final_price(), 
                    'quantity': obj.quantity, 
                    'low_stock_limit': obj.low_stock_threshold,
                }
        variants_data.append(variant_info)
        return variants_data
        
class InventoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user

        return Inventory.objects.create(**validated_data)

# 50
# quantity changes : -20 -> 50 - 20
# quantity changes : +50 -> 50 + 50


class InventoryUpdateSerializer(serializers.ModelSerializer):
    
    # stock : 300, -300
    stock = serializers.DecimalField(max_digits=10, decimal_places=0, write_only=True, required=False, default=0)
    class Meta:
        model = Inventory
        fields = ['product', 'quantity', 'reserved', 'stock', 'low_stock_threshold', 'created_by', 'updated_by', 'created_at', 'updated_at']
        read_only_fields = ['product', 'quantity', 'created_by', 'updated_by', 'created_at', 'updated_at']

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            instance.updated_by = user
            stock_adjustment = validated_data.pop('stock', 0)            
            instance.quantity += int(stock_adjustment) 
            if(instance.quantity < 0):
                raise ValidationError(
                    "Insufficient reserved stock ",
                )
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
        return instance