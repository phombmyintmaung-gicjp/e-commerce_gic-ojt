from rest_framework import serializers
from ..models import ProductVariant, Product

class ProductVariantsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'product', 'size', 'color', 'image', 'is_default']

class ProductVariantCreateSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    
    class Meta:
        model = ProductVariant
        fields = ['product', 'size', 'color', 'image', 'is_default', 'created_by', 'updated_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'updated_by', 'created_at', 'updated_at']
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user

        return ProductVariant.objects.create(**validated_data)

class ProductVariantUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['product', 'size', 'color', 'image', 'is_default', 'created_by', 'updated_by', 'created_at', 'updated_at']
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