from rest_framework import serializers
from ..models import ShippingAddress, Customer

class ShippingAddressListSerializer(serializers.ModelSerializer):
    region_name = serializers.SerializerMethodField()
    township_name = serializers.SerializerMethodField()
    class Meta:
        model = ShippingAddress
        fields = ['id', 'customer', 'address', 'township_name', 'region_name', 'phone_number']
    
    def get_township_name(self, obj):
        return obj.township.name
    
    def get_region_name(self, obj):
        return obj.township.region.name
        
class ShippingAddressCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingAddress
        fields = ['address','township', 'phone_number', 'created_at', 'updated_at']
        read_only_fields = ['customer','created_by','updated_by', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['customer'] = user
            
        return ShippingAddress.objects.create(**validated_data)
    
class ShippingAddressUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ShippingAddress
        fields = ['customer','address','township', 'phone_number', 'created_at', 'updated_at']
        read_only_fields = ['created_by','updated_by', 'created_at', 'updated_at']
    
    # def update(self, instance, validated_data):
    #     request = self.context.get('request')
    #     if request:
    #         user = request.user
    #         instance.updated_by = user
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)  
    #     instance.save()
    #     return instance