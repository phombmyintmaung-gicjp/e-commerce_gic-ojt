from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.db.models import Max
import datetime
from django.utils import timezone
from django.db import transaction
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class Region(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Township(models.Model):
    name = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
# customer
class Customer(AbstractUser):
    address = models.CharField(max_length=255, blank = True, null = True)
    township = models.ForeignKey(Township, on_delete=models.CASCADE, blank = True, null = True)    
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.username
    class Meta:
        verbose_name = "Customer"        
        ordering = [ '-created_at']        
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name="customer_set",
        related_query_name="customer",
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name="customer_set",
        related_query_name="customer",
    )

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='shipping_addresses')
    address = models.CharField(max_length=255)
    township = models.ForeignKey(Township, on_delete=models.CASCADE)
    
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def getAddress(self):
        return f"{self.address}, {self.township.name}, {self.township.region.name}"
   

# category
class Category(models.Model):
    title = models.CharField(max_length=255)    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_categories', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_categories', null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = [ 'title']

# product
class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)   
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    attributes = models.JSONField(blank=True, null=True)  # For additional product attributes
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_products', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_products', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.title
    
    def get_discount(self):
        return ProductDiscount.objects.filter(
            product=self,
            is_active=True
        ).order_by('-percentage').first()
        

    def get_discounted_price(self):
    # """
    # Calculate the discounted price with comprehensive validation including:
    # - Discount existence
    # - Current date within discount period
    # - Percentage validation
    # - Minimum price protection
    # """
        try:
            # Get the most generous active discount for this product
            discount = self.get_discount()

            if discount and discount.is_current():
                # Ensure percentage is valid (0-100) before calculation
                # Although validators should prevent this, it's good defensive coding
                percentage = max(0, min(100, float(discount.percentage)))

                # Calculate discounted price
                discounted_price = round(self.price * (1 - percentage / 100), 2)

                # Ensure the price doesn't go negative (defensive coding)
                return max(0, discounted_price)
                
            return self.price
            
        except (TypeError, ValueError):
            # Handle any calculation errors gracefully
            return self.price
    
    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = [ '-created_at']
        
class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="variants")
    size = models.CharField(max_length=20, blank=True, null=True)
    color = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(upload_to='variants/', blank=True, null=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_products_variants', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_products_variants', null=True, blank=True)
    # Price override (if different from base price)
    price_override = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        null=True, 
        blank=True,
        validators=[MinValueValidator(0)]
    )
    
    #discounted price
    def get_discounted_price(self):
        discount = ProductDiscount.objects.filter(
            product=self.product
        ).order_by('-percentage').first()
        if discount and discount.is_current():
            return round(self.price_override * (1 - float(discount.percentage) / 100), 2)
        return self.price_override  
    
    def get_final_price(self):
        return self.get_discounted_price() if self.price_override else self.product.get_discounted_price()

    def __str__(self):
        return f"{self.product.title} - {self.get_variant_display()}"

    def get_variant_display(self):
        # """Returns a human-readable variant description"""
        parts = []
        if self.size: parts.append(f"Size: {self.size}")
        if self.color: parts.append(f"Color: {self.color}")        
        return ", ".join(parts) if parts else "Default"
    
    @property
    def inventory(self):
        # """Helper property to get or create inventory"""
        inv, created = Inventory.objects.get_or_create(variant=self)
        return inv
    
    class Meta:
        unique_together = [('product', 'size', 'color')]
        ordering = ['product', 'is_default']

# inventory
class Inventory(models.Model):
    variant = models.OneToOneField(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name='inventory_record'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventory_records', null=False)    
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(0)], default=0)
    low_stock_threshold = models.PositiveIntegerField(default=5)
    is_variant = models.BooleanField(default=False)
    # pending orders -> reserved stock += ordered items count
    # completed orders -> reserved -= shipped items count, quantity -= shipped items count
    reserved = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_inventories', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_inventories', null=True, blank=True)

    def available_stock(self):
        return self.quantity - self.reserved    
  
    def is_low_stock(self):
        return self.available_stock() <= self.low_stock_threshold

    def __str__(self):
        return f"Inventory for {self.variant} - {self.available_stock()} available"

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=(
                    models.Q(variant__isnull=False, is_variant=True) | 
                    models.Q(variant__isnull=True, is_variant=False)
                ),
                name='inventory_xor_product_variant'
            )
        ]

    def save(self, *args, **kwargs):
        if self.variant:
            self.product = self.variant.product
        super().save(*args, **kwargs)

# order
class Order(models.Model):   
    
    orderNo = models.CharField(max_length=20, unique=True, blank=True, null=True)
    user = models.ForeignKey(Customer, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.PROTECT) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[('Create', 'Create'), ('Pending', 'Pending'), ('Delivered', 'Delivered'), ('Cancelled', 'Cancelled')], default='Create')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    shipping_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tax = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)    
    grand_total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    remark = models.TextField(blank = True, null = True)    
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_orders', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_orders', null=True, blank=True)
    def __str__(self):
        return f"Order {self.id} by {self.user.first_name} {self.user.last_name}"

    def get_address(self):
        # Return the specific address for this order
        return self.shipping_address
        # Or if using Option 1 and falling back:
        # return self.shipping_address or self.user.default_shipping_address

    def save(self, *args, **kwargs):
        
        is_new = not self.pk  # Check if this is a new order
        old_status = None
        
        if not is_new:
            old_order = Order.objects.get(pk=self.pk)
            old_status = old_order.status
        
        if not self.orderNo:
            # Generate order number only for new orders
            today = datetime.date.today()
            date_prefix = today.strftime("%y%m%d")  # YYMMDD format
            
            # Get the highest order number for today
            max_today = Order.objects.filter(
                orderNo__startswith=date_prefix
            ).aggregate(Max('orderNo'))['orderNo__max']
            
            if max_today:
                # Increment the sequence number
                last_seq = int(max_today.split('-')[-1])
                new_seq = last_seq + 1
            else:
                # First order of the day
                new_seq = 1
                
            self.orderNo = f"{date_prefix}-GIC-{new_seq:06d}"
            
        super().save(*args, **kwargs)
        
        # Handle inventory changes after save
        if is_new:
            self._reserve_stock()
        elif old_status != self.status:
            self._handle_status_change(old_status)    
   
    @transaction.atomic
    def _reserve_stock(self):
        # """Reserve stock when order is created"""
        for item in self.orderItems.all():
            inventory = self._get_inventory_for_item(item)
            inventory.reserved += item.quantity
            inventory.save()

    @transaction.atomic
    def _handle_status_change(self, old_status):
        # """Handle inventory changes when order status changes"""
        if self.status == 'Shipped':
            self._process_shipped_order()
        elif self.status == 'Cancelled' and old_status == 'Pending':
            self._release_reserved_stock()
        elif self.status == 'Delivered':
            self._confirm_delivery()

    def _process_shipped_order(self):
        # """Process inventory when order is shipped"""
        for item in self.orderItems.all():
            inventory = self._get_inventory_for_item(item)
            inventory.reserved -= item.quantity
            inventory.quantity -= item.quantity
            inventory.save()

    def _release_reserved_stock(self):
        # """Release reserved stock when order is cancelled"""
        for item in self.orderItems.all():
            inventory = self._get_inventory_for_item(item)
            inventory.reserved -= item.quantity
            inventory.save()

    def _confirm_delivery(self):
        # """Additional processing when order is delivered"""
        # Could add delivery confirmation logic here
        pass

    def _get_inventory_for_item(self, order_item):
        # """Get or create inventory record for an order item"""
        if order_item.variant:
            # Use variant inventory if available
            return order_item.variant.inventory_record
        else:
            # Fall back to product inventory
            inventory, created = Inventory.objects.get_or_create(
                product=order_item.product,
                isVariant=False,
                defaults={'quantity': 0, 'reserved': 0}
            )
            return inventory

    def get_address(self):
        return self.user.shipping_address    
   
    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        ordering = ['-created_at']
     
        
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="orderItems")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.quantity} x {self.product.title} in {self.order.user.first_name}'s order"
    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"
        ordering = [ '-created_at']

class ShippingFee(models.Model):
    township = models.ForeignKey(Township, on_delete=models.CASCADE, unique=True)
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Shipping Fee for {self.township.name} - {self.fee}"

class PaymentMethod(models.Model):
    name = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to='payment_methods/', blank=True, null=True)
    phoneNo = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_payment_methods', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_payment_methods', null=True, blank=True)
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "PaymentMethod"
        verbose_name_plural = "PaymentMethods"
        ordering = [ '-created_at']
    

# payment
class Payment(models.Model):    
    order = models.OneToOneField(
        Order, 
        on_delete=models.CASCADE,
        related_name='orders'  # Optional: but good practice. Allows customer.cart
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.CASCADE)
    transaction_image = models.ImageField(upload_to='payments/', blank=True, null=True, unique=True)
    payment_phone_no = models.CharField(max_length=11, blank=True, null=True)    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_payments', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_payments', null=True, blank=True)
    def __str__(self):
        return f"Payment for Order {self.order.id} - {self.status}"
    class Meta:
        verbose_name = "Payment"
        verbose_name_plural = "Payments"
        ordering = [ '-created_at']

# review
class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.OneToOneField(
        Customer, 
        on_delete=models.CASCADE,
        related_name='review'  # Optional: but good practice. Allows customer.cart
    )
    rating = models.PositiveSmallIntegerField(
        choices=[(1, '1 Star'), (2, '2 Stars'), (3, '3 Stars'), (4, '4 Stars'), (5, '5 Stars')],
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_reviews', null=True, blank=True)
    def __str__(self):
        return f"Review for {self.product.title} by {self.user.username}"
    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"
        ordering = [ '-created_at']

# cart
class Cart(models.Model):
    user = models.OneToOneField(
        Customer, 
        on_delete=models.CASCADE,
        related_name='cart'  # Optional: but good practice. Allows customer.cart
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_carts', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_carts', null=True, blank=True)

    def __str__(self):
        return f"Cart for {self.user.username}"
    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"
        ordering = [ '-created_at']

# cart item
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="cartItems")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.quantity} x {self.product.title} in {self.cart.user.username}'s cart"
    
    def get_total_price(self):
        # Calculate price based on variant price or product base price
        variant_price = self.variant.get_final_price() if self.variant else self.product.get_discounted_price()
        return variant_price * self.quantity
    
    class Meta:
        verbose_name = "Cart Item"
        verbose_name_plural = "Cart Items"
        ordering = [ '-created_at']

# discount
class ProductDiscount(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    percentage = models.DecimalField(max_digits=4,decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(100)])
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='created_discounts', null=True, blank=True)
    updated_by = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='updated_discounts', null=True, blank=True)
    
    def __str__(self):
        return f"Discount for {self.product.title}: {self.percentage}%"

    def is_current(self):
        from django.utils import timezone
        now = timezone.now()
        return self.is_active and self.start_date <= now <= self.end_date

    class Meta:
        verbose_name = "Discount"
        verbose_name_plural = "Discounts"
        ordering = [ '-created_at']
