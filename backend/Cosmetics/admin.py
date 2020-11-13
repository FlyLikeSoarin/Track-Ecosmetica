from django.contrib import admin
from .models import Barcode
from .models import Product
from .models import History
from .models import Review
from .models import Ingredient


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand_name')


@admin.register(Barcode)
class BarcodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'product')
    readonly_fields = ('product', )

@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', )
    readonly_fields = ('product', )

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'title', 'rating')
    readonly_fields = ('product', )


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('inci_name', 'description')
    ordering = ('inci_name',)
