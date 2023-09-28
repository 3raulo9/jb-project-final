from django.urls import path
from base.views import product_views as views



urlpatterns = [
    path('', views.getProducts, name="products"),
    path('<str:primarykey>/', views.getProduct, name="product"),
    path('create/', views.createProduct, name="product-create"),

    path('delete/<str:primarykey>/', views.deleteProduct, name="product-delete"),

]