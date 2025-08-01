from rest_framework import serializers
from ..models import PaymentMethod

class PaymentMethodListSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'
        
class PaymentMethodCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PaymentMethod
        fields = ['name', 'image', 'phoneNo', 'created_by','updated_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by','updated_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user
            
        return PaymentMethod.objects.create(**validated_data)
    
class PaymentMethodUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PaymentMethod
        fields = ['name', 'image','created_by','updated_by', 'created_at', 'updated_at']
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