from django.urls import path
from base.views import user_views as views



urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),
    path('<str:primarykey>/', views.getUserById, name='user'),
    path('update/<str:primarykey>/', views.updateUser, name='user-update'),
    path('delete/<str:primarykey>/', views.deleteUser, name='user-delete'),

]
