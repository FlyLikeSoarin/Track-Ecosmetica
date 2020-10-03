from django.urls import path
from Cosmetics import views

urlpatterns = [
    path('product/', views.ProductRetrieveCreateView.as_view()),
]
