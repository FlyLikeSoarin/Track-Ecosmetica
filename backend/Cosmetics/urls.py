from django.urls import path
from Cosmetics import views

urlpatterns = [
    path('history/',  views.ProductHistoryView.as_view()),
    path('review/', views.ReviewCreateListView.as_view()),
    path('', views.ProductRetrieveCreateView.as_view()),
    path('analyze_image/', views.AnalyzeIngredientImageView.as_view()),
    path('make_favorite/', views.FavoriteCreateView.as_view()),
    path('ingredient/', views.IngredientView.as_view())
]
