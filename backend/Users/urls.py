from django.urls import path
from Users import views

urlpatterns = [
    path('auth/', views.AuthView.as_view()),
    path('user/<str:username>/', views.RetrieveUserView.as_view()),
]
