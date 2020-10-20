from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import BarcodeSerializer, ProductReadSerializer, ProductWriteSerializer
from .models import Barcode, Product, History
from .web import get_product_or_fetch, severity_to_score

import json


class ProductHistoryView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = History.objects.filter(user=request.user.id)\
            .order_by('-timestamp').values_list('product', flat=True)[:10]
        result = []
        for product_id in products:
            product = get_object_or_404(Product.objects.all(), pk=product_id)
            product_serializer = ProductReadSerializer(product)
            result.append(product_serializer.data)
        return Response(result)



class ProductRetrieveCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, AllowAny]

    def get(self, request):
        serializer = BarcodeSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        barcodes = Barcode.objects.filter(code=serializer.validated_data['code'])
        if barcodes.count() == 0:
            raise Http404('barcode not found in database')
        elif barcodes.count() > 1:
            barcodes = barcodes.filter(code_format=serializer.validated_data['code_format'])

        if request.auth is not None:
            barcode = barcodes.get()
            History.objects.create(product=barcode.product, user=request.user)

        product = barcode.product
        ewg_product = get_product_or_fetch(product.name, product.brand_name)
        if ewg_product != False:
            product.ingredients = json.dumps(ewg_product['ingredient'])
            product.ingredients = json.dumps(ewg_product['ingredient'])
            product.eco_score = severity_to_score(ewg_product['gauges'][0][1])
            product.safety_score = severity_to_score(ewg_product['gauges'][1][1])
            product.zoo_score = severity_to_score(ewg_product['gauges'][2][1])
            product.total_score = str(11 - int(ewg_product['score']))
            product.save()


        product_serializer = ProductReadSerializer(barcode.product)
        data = product_serializer.data
        data['ingredients'] = json.loads(data['ingredients'])
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
            History.objects.create(product=barcode.product, user=request.user)
        product_serializer = ProductReadSerializer(product)
        return Response(product_serializer.data)
