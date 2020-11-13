from rest_framework import serializers
from .models import Barcode, Product, Review, Ingredient, Favorite


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
        fields = [
            'name',
            'brand_name',
            'ingredients',
            'description',
            'code',
            'code_format',
            'img_url',
        ]

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

    def validate_rating(self, value):
        if 1 <= value and value <= 5:
            return value
        raise serializers.ValidationError('Rating should be between values of 1 and 5')


class IngredientReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class IngredientImageSerializer(serializers.Serializer):
    class Meta:
        fields = ['content']

    content = serializers.CharField()


class FavoriteSerializer(serializers.Serializer):
    class Meta:
        fields = ['in_favorite']

    in_favorite = serializers.BooleanField(default = True)
