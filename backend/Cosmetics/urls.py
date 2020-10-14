from django.urls import path
from Cosmetics import views

urlpatterns = [
    path('product/history',  views.ProductHistoryView.as_view()),
    path('product/', views.ProductRetrieveCreateView.as_view()),
]
