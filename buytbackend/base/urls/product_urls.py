from django.urls import path
from base.views import product_views as views



urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),

    path('<str:primarykey>/', views.getProduct, name="product"),

    path('update/<str:primarykey>/', views.updateProduct, name="product-update"),
    path('delete/<str:primarykey>/', views.deleteProduct, name="product-delete"),

]