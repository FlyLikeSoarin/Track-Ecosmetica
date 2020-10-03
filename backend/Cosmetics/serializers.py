from rest_framework import serializers
from .models import Barcode, Product


class BarcodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barcode
        fields = ['code', 'code_format']

    code_format = serializers.CharField(default = '-', required=False, max_length=50)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'brand_name', 'universe_htt_id', 'brand_htt_id']

    # universe_htt_id = serializers.CharField(default = '-', required=False, max_length=50)
    # brand_htt_id = serializers.CharField(default = '-', required=False, max_length=50)
