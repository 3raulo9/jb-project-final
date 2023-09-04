from django.contrib import admin
from .models import *

# Define a custom admin action
def delete_selected_orders(modeladmin, request, queryset):
    queryset.delete()

delete_selected_orders.short_description = "Delete selected orders"  # Displayed on the admin panel button

# Register your models and apply the custom action to the Order model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('_id', 'name', 'price', 'countInStock')
    
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('_id', 'product', 'user', 'rating')
    
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('_id', 'product', 'order', 'qty', 'price')

@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('_id', 'order', 'address', 'city', 'postalCode', 'country', 'shippingPrice')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('_id', 'user', 'createdAt', 'isPaid', 'isDelivered')
    list_filter = ('isPaid', 'isDelivered')
    actions = [delete_selected_orders]  # Apply the custom action
    actions_select_all = True  # Add the ability to select all orders

# Additional configurations for other models can be added here if needed

