from rest_framework import serializers
from ..models import Product, Category, Customer, Inventory, Review
from .product_variant import ProductVariantsListSerializer
from django.db.models import Avg

class ProductListSerializer(serializers.ModelSerializer):
    variants = ProductVariantsListSerializer(many=True, read_only=True)
    rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        # fields = '__all__'
        fields = ['id', 'category', 'title', 'description', 'price', 
                  'image', 'attributes', 'is_active', 'created_at', 
                  'updated_at', 'rating', 'variants'] # Add 'variants' here

    def get_rating(self, obj):
        reviews = Review.objects.filter(product=obj)
        if reviews:      
            return {
                    'rating': reviews.aggregate(Avg('rating'))['rating__avg'],
                    'total_reviews': reviews.count(),                 
                }
        else:
            return {}
    
class ProductCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    image = serializers.ImageField(required=False)
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user

        return Product.objects.create(**validated_data)

class ProductUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['title', 'description', 'price', 'category', 'attributes', 'created_by', 'updated_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'updated_by', 'created_at', 'updated_at']

    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            instance.updated_by = user
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class ProductInventorySerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source='id')
    product_name = serializers.CharField(source='title')
    price = serializers.SerializerMethodField()
    low_stock_limit = serializers.SerializerMethodField()
    is_variant = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    variants = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
            'product_id', 'product_name', 'price', 'is_variant',
            'low_stock_limit', 'total','variants'
        ]
    def get_low_stock_limit(self, obj):
        try:
            base_inventory = Inventory.objects.get(product=obj, is_variant=False)
            return base_inventory.low_stock_threshold
        except Inventory.DoesNotExist:
            return 0
    def get_price(self, obj):
        return obj.get_discounted_price()
        
    def get_is_variant(self, obj):
        try:
            inventory = Inventory.objects.get(product=obj, is_variant=False)
            return inventory.is_variant
        except Inventory.DoesNotExist:
            return 0        
    
    def get_total(self, obj):
        total_available = 0
        
        try:
            base_inventory = Inventory.objects.get(product=obj, is_variant=False)
            total_available += base_inventory.quantity()
        except Inventory.DoesNotExist:
            pass
        try:
            inventory_list = Inventory.objects.get(product=obj, is_variant=False)
            
            for variant in inventory_list:
                total_available += variant.quantity           
        
        except Inventory.DoesNotExist:
                pass 
        
        return total_available
    
    def get_variants(self, obj):
        variants_data = []
        try:
            for inventory in Inventory.objects.filter(product=obj, is_variant=True): # Uses the 'variants' related_name
                                            
                price = inventory.variant.get_final_price()                
                variant_info = {
                    'id' : inventory.id,
                    'name': inventory.variant.get_variant_display(), 
                    'price': price, 
                    'quantity': inventory.quantity, 
                    'low_stock_limit': inventory.low_stock_threshold,
                }
                variants_data.append(variant_info)
        except Inventory.DoesNotExist:              
            pass 
        # variant_info = {
        #             'name': obj.variant.get_variant_display(), 
        #             'price': obj.variant.get_final_price(), 
        #             'quantity': obj.quantity, 
        #             'low_stock_limit': obj.low_stock_threshold,
        #         }
        # variants_data.append(variant_info)
        return variants_data
    
