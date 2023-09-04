from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
        )

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item_qty = int(i['qty'])

            # Check if there's enough stock before decrementing
            if product.countInStock >= item_qty:
                item = OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    qty=item_qty,
                    price=i['price'],
                    image=product.image.url,
                )

                product.countInStock -= item_qty
                product.save()
            else:
                # Return a response indicating insufficient stock
                return Response({'detail': f'Insufficient stock for product {product.name}'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
