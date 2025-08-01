from rest_framework import serializers
from ..models import Category, Customer

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class CategoryCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user
            
        return Category.objects.create(**validated_data)
    
class CategoryUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['title','created_by','updated_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by','updated_by', 'created_at', 'updated_at']
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            instance.updated_by = user
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  
        instance.save()
        return instance