from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser




from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from base.models import Product, Review

from base.serializers import ProductSerializer


from django.contrib.auth.hashers import make_password
from rest_framework import status

@api_view(['GET'])
def getProducts(request):

    query = request.query_params.get('keyword')

    if query == None:
        query = ''
    products = Product.objects.filter(
        name__icontains=query).order_by('-createdAt')
    page = request.query_params.get('page')
    paginator = Paginator(products, 8)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)

    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getProduct(request, primarykey):
    product = Product.objects.get(_id=primarykey)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'NAME',
        price = 0,
        brand = 'BRAND',
        countInStock = 0,
        category = 'CATEGORY',
        description = ''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, primarykey):
    data = request.data
    product = Product.objects.get(_id=primarykey)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, primarykey):
    product = Product.objects.get(_id=primarykey)
    product.delete()
    
    return Response("Product Deleted")


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()

    return Response('Image got uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, primarykey):

    user = request.user
    product = Product.objects.get(_id=primarykey)
    data = request.data
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'already reviewd'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    elif data['rating'] == 0:
        content = {'detail': 'please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Addd')