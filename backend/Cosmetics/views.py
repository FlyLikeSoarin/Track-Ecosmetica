from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly

from .serializers import BarcodeSerializer
from .serializers import ProductWriteSerializer, ProductReadSerializer
from .serializers import ReviewWriteSerializer, ReviewReadSerializer
from .models import Barcode, Product, History, Review
from .web import get_product_or_fetch, severity_to_score
from .utils import add_to_history

import json


class ProductHistoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = History.objects.filter(user=request.user.id)\
            .order_by('-timestamp').values_list('product', flat=True).distinct()
        print(list(products.distinct()))
        result = []
        for product_id in products:
            product = get_object_or_404(Product.objects.all(), pk=product_id)
            product_serializer = ProductReadSerializer(product)
            data = product_serializer.data
            try:
                data['ingredients'] = json.loads(data['ingredients'])
            except:
                pass
            result.append(data)
        return Response(result)



class ProductRetrieveCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def get(self, request):
        serializer = BarcodeSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        barcodes = Barcode.objects.filter(code=serializer.validated_data['code'])
        if barcodes.count() == 0:
            raise Http404('barcode not found in database')
        elif barcodes.count() > 1:
            barcodes = barcodes.filter(code_format=serializer.validated_data['code_format'])

        barcode = barcodes.get()
        if request.auth is not None:
            add_to_history(product=barcode.product, user=request.user)

        product = barcode.product
        ewg_product = get_product_or_fetch(product.name, product.brand_name)
        if ewg_product != False:
            product.ingredients = json.dumps(ewg_product['ingredient'])
            product.ingredients = json.dumps(ewg_product['ingredient'])
            product.eco_score = severity_to_score(ewg_product['gauges'][0][1])
            product.safety_score = severity_to_score(ewg_product['gauges'][1][1])
            product.zoo_score = severity_to_score(ewg_product['gauges'][2][1])
            product.total_score = str(11 - int(ewg_product['score']))
            product.img_url = ewg_product['img_uri']
            product.save()


        product_serializer = ProductReadSerializer(barcode.product)
        data = product_serializer.data
        try:
            data['ingredients'] = json.loads(data['ingredients'])
        except:
            pass
        return Response(data)

    def post(self, request):
        serializer = ProductWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            barcode = Barcode.objects.get(code=data['code'], code_format=data['code_format'])
            product = barcode.product
            product.name = data['name']
            product.brand_name = data['brand_name']
            product.description = data['description']
            product.ingredients = data['ingredients']
            product.save()
            barcode.product=product
            barcode.save()
        except ObjectDoesNotExist:
            product = Product.objects.create(
                name = data['name'],
                brand_name = data['brand_name'],
                description = data['description'],
                ingredients = data['ingredients'])
            barcode = Barcode.objects.create(
                code=data['code'],
                code_format=data['code_format'],
                product=product)

        if request.auth is not None:
            add_to_history(product=barcode.product, user=request.user)
        product_serializer = ProductReadSerializer(product)
        return Response(product_serializer.data)


class ReviewCreateListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        if 'code' in request.query_params:
            barcode = get_object_or_404(Barcode, code=request.query_params['code'])
            product = barcode.product
        elif 'product' in request.query_params:
            product = get_object_or_404(Product, product=request.query_params['product'])
        reviews = Review.objects.filter(product=product.name)
        result = []
        for review in reviews:
            result.append(ReviewReadSerializer(review).data)
        return Response(result)

    def post(self, request):
        if 'code' in request.query_params:
            barcode = get_object_or_404(Barcode, code=request.query_params['code'])
            product = barcode.product
        elif 'product' in request.query_params:
            product = get_object_or_404(Product, product=request.query_params['product'])

        serializer = ReviewWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        review = Review.objects.create(**data, user=request.user, product=product)


        return Response(ReviewReadSerializer(review).data)


class AnalyzeIngredientImageView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = IngredientImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        print(data.content)

        return Response(data)
