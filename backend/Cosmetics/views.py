from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BarcodeSerializer, ProductReadSerializer, ProductWriteSerializer
from .models import Barcode, Product, History


class ProductHistoryView(APIView):
    def get(self, request):
        products = History.objects.all().order_by('pk').values_list('product', flat=True)
        result = []
        for product_id in products:
            product = get_object_or_404(Product.objects.all(), pk=product_id)
            product_serializer = ProductReadSerializer(product)
            result.append(product_serializer.data)
        return Response(result)



class ProductRetrieveCreateView(APIView):
    def get(self, request):
        serializer = BarcodeSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        barcodes = Barcode.objects.filter(code=serializer.validated_data['code'])
        if barcodes.count() == 0:
            raise Http404('barcode not found in database')
        elif barcodes.count() > 1:
            barcodes = barcodes.filter(code_format=serializer.validated_data['code_format'])

        barcode = barcodes.get()
        History.objects.create(product=barcode.product)
        product_serializer = ProductReadSerializer(barcode.product)
        return Response(product_serializer.data)

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

        History.objects.create(product=barcode.product)
        product_serializer = ProductReadSerializer(product)
        return Response(product_serializer.data)
