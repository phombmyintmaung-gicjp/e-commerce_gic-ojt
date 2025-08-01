from rest_framework import serializers
from ..models import Review, Customer, Product

class ReviewListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
class ReviewCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ['product', 'rating']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['user'] = user
            
        return Review.objects.create(**validated_data)