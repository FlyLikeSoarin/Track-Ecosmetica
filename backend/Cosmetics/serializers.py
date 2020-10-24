from rest_framework import serializers
from .models import Barcode, Product, Review


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
        extra_kwargs = { 'name': {'validators': []}, }
        fields = ['name', 'brand_name', 'ingredients', 'description', 'code', 'code_format']

    code = serializers.CharField(max_length=50)
    code_format = serializers.CharField(max_length=10, default = 'UPCEAN', required=False)


class ReviewReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ReviewWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        exclude = ['user', 'product']


class IngredientImageSerializer(serializers.Serializer):
    class Meta:
        fields = ['content']

    content = serializers.CharField()
