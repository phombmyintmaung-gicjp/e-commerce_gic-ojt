from rest_framework import serializers
from ..models import ShippingFee

class ShippingFeeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingFee
        fields = '__all__'
        
class ShippingFeeCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingFee
        fields = '__all__'
    
class ShippingFeeUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingFee
        fields = ['township', 'fee']    
    