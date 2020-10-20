from django.contrib import admin
from .models import Barcode
from .models import Product
from .models import History


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand_name')


@admin.register(Barcode)
class BarcodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'product')

@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ('product', )
