from rest_framework import serializers
from .models import Barcode, Product


class BarcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barcode
        fields = ['code', 'code_format']

    code_format = serializers.CharField(max_length=10, default = 'UPCEAN', required=False)


class ProductReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'brand_name', 'ingredients', 'description']

    barcode = serializers.CharField(max_length=50)
    code_format = serializers.CharField(max_length=10, default = 'UPCEAN', required=False)
