from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import BarcodeSerializer, ProductSerializer
from .models import Barcode, Product


class ProductRetrieveCreateView(APIView):
    def get(self, request):
        print(request.query_params)
        serializer = BarcodeSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        barcodes = Barcode.objects.filter(code=serializer.validated_data['code'])
        if barcodes.count() == 0:
            raise Http404('barcode not found in database')
        elif barcodes.count() > 1:
            barcodes = barcodes.filter(code_format=serializer.validated_data['code_format'])

        barcode = barcodes.get()
        product_serializer = ProductSerializer(barcode.product)
        return Response(product_serializer.data)

    def post(self, request):
        pass
