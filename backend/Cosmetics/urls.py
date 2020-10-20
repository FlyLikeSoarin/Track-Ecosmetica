from django.urls import path
from Cosmetics import views

urlpatterns = [
    path('history/',  views.ProductHistoryView.as_view()),
    path('', views.ProductRetrieveCreateView.as_view()),
]
