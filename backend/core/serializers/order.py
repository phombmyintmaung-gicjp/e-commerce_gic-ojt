from rest_framework import serializers
from ..models import Customer, Product, ProductVariant, Order, OrderItem, ShippingFee, Payment
from .order_item import OrderItemListSerializer
from decimal import Decimal

class OrderListSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    payment = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'orderNo', 'shipping_address', 'user', 'status', 'total_price' , 'shipping_price', 'tax', 'grand_total_price' , 'remark', 'payment', 'order_items']
    
    def get_payment(self, obj):       
        payment = Payment.objects.filter(order = obj).first()        
        
        if payment:
            transaction_image = None
            if payment.transaction_image:
                transaction_image = payment.transaction_image
            return {
                'amount' : payment.amount,
                'payment_method' : payment.payment_method.name,
                'transaction_image' : transaction_image,
                'payment_phone_no' : payment.payment_phone_no,
            }
        return None
    
    def get_order_items(self, obj):
        order_items_data = []
        try:
            for order_item in OrderItem.objects.filter(order=obj): # Uses the 'variants' related_name
                                            
                name = order_item.product.title
                variant = order_item.variant
                variant_name = ''
                price = order_item.product.get_discounted_price()
                if variant:
                    variant_name = variant.get_variant_display()
                    price = variant.get_final_price()
                    print(price)
                order_items_info = {
                    'product_name' : name,
                    'variant': variant_name, 
                    'quantity': order_item.quantity, 
                    'price': price,
                    'total_price' :  order_item.price_at_purchase
                }
                order_items_data.append(order_items_info)
        except Order.DoesNotExist:              
            pass         
        return order_items_data    
        
class OrderCreateSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Order
        fields = ['id', 'orderNo', 'user', 'shipping_address', 'status',  'created_at', 'updated_at', 'status', 'total_price', 'shipping_price', 'tax', 'grand_total_price', 'remark', 'created_by', 'updated_by']
        read_only_fields = ['id', 'orderNo', 'user', 'status',  'created_at', 'updated_at','total_price', 'shipping_price', 'tax', 'grand_total_price', 'remark', 'created_by', 'updated_by']
    
    def create(self, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            validated_data['created_by'] = user
            validated_data['user'] = user                      
            
        return Order.objects.create(**validated_data)  
    
    
class OrderUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['status', 'remark']
    
    def update(self, instance, validated_data):
        request = self.context.get('request')
        if request:
            user = request.user
            instance.updated_by = user
            total_price = self.getTotalPrice(instance)
            tax = total_price * Decimal(.10) 
            shipping_price = 0.0
            shipping_fee = ShippingFee.objects.filter(township = instance.shipping_address.township).first()
            if shipping_fee:
                shipping_price = shipping_fee.fee
            
            instance.total_price = total_price
            instance.shipping_price = shipping_price
            instance.tax = tax
            instance.grand_total_price = total_price + Decimal(shipping_price) + tax
        for attr, value in validated_data.items():
            setattr(instance, attr, value)  
        instance.save()
        return instance 
    
    def getTotalPrice(self, obj):       
                
        total = 0
        try:
            for order_item in OrderItem.objects.filter(order=obj):                
                
                total += order_item.price_at_purchase   
                
        except Order.DoesNotExist:
            pass
        return total