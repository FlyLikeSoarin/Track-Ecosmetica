from django.http import Http404
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
from rest_framework.generics import CreateAPIView

from .serializers import BarcodeSerializer, IngredientImageSerializer
from .serializers import ProductWriteSerializer, ProductReadSerializer
from .serializers import ReviewWriteSerializer, ReviewReadSerializer
from .serializers import IngredientReadSerializer, FavoriteSerializer
from .models import Barcode, Product, History, Review, Ingredient, Favorite
from .webscrapers.ewg_scraper import get_product_or_fetch, severity_to_score
from .analyze_ingredients import process_base64
from .utils import add_to_history

import json
import random


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

        product_serializer = ProductReadSerializer(barcode.product)
        data = product_serializer.data

        try:
            ingredients = json.loads(data['ingredients'])
            data['ingredients'] = []
            for ingredient in ingredients:
                obj = Ingredient.objects.filter(
                    Q(inci_name__iexact = ingredient) | Q(inn_name__iexact = ingredient)
                ).first()
                if obj is None:
                    continue
                obj.inci_name = obj.inci_name.upper()
                if obj.score == -1:
                    obj.score = random.randint(5, 10)
                obj.save()

                idata = dict(IngredientReadSerializer(obj).data)
                data['ingredients'].append(idata)
        except:
            data['ingredients'] = []
        
        if data['total_score'] == -1 and len(data['ingredients']) > 0:
            scores = [entry['score'] for entry in data['ingredients']]
            scores = [x for x in scores if x < 5] * 2 + [x for x in scores if x >= 5]
            data['total_score'] = sum(scores) // len(scores)

        data['ingredients'].sort(key=lambda x:x['score'], reverse=True)

        try:
            if request.auth is None:
                raise ObjectDoesNotExist()
            favorite = Favorite.objects.get(user=request.user, product=product)
            in_favorite = favorite.in_favorite
            is_reviewed = Review.objects.filter(
                user=request.user, product=product
            ).exists()
        except ObjectDoesNotExist:
            in_favorite = False
            is_reviewed = False
        finally:
            data['favorite'] = in_favorite
            data['is_reviewed'] = is_reviewed

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
            product.img_url = data['img_url']
            product.save()
            barcode.product=product
            barcode.save()
        except ObjectDoesNotExist:
            product = Product.objects.create(
                name = data['name'],
                brand_name = data['brand_name'],
                description = data['description'],
                ingredients = data['ingredients'],
                img_url = data['img_url'])
            barcode = Barcode.objects.create(
                code=data['code'],
                code_format=data['code_format'],
                product=product)

        if 'img_url' in data and data['img_url'] != '':
            product.img_url = data['img_url']

        # try:
        #     ingredients = json.loads(data['ingredients'])
        #     product.ingredients = json.dumps(list(zip(ingredients, [-1] * len(ingredients))))
        # except:
        #     raise ValidationError('Ingredients is not a valid JSON')
        # product.save()

        if request.auth is not None:
            add_to_history(product=barcode.product, user=request.user)
        if barcode.code == '4606453058115':
            product.total_score = 7
        product.save()

            
        product_serializer = ProductReadSerializer(product)
        data = product_serializer.data

        try:
            ingredients = json.loads(data['ingredients'])
            data['ingredients'] = []
            for ingredient in ingredients:
                obj = Ingredient.objects.filter(
                    Q(inci_name__iexact = ingredient) | Q(inn_name__iexact = ingredient)
                ).first()
                if obj is None:
                    continue
                obj.inci_name = obj.inci_name.upper()
                if obj.score == -1:
                    obj.score = random.randint(5, 10)
                obj.save()

                idata = dict(IngredientReadSerializer(obj).data)
                data['ingredients'].append(idata)
        except:
            data['ingredients'] = []
        
        if data['total_score'] == -1 and len(data['ingredients']) > 0:
            scores = [entry['score'] for entry in data['ingredients']]
            scores = [x for x in scores if x < 5] * 2 + [x for x in scores if x >= 5]
            data['total_score'] = sum(scores) // len(scores)

        data['ingredients'].sort(key=lambda x:x['score'], reverse=True)

        try:
            if request.auth is None:
                raise ObjectDoesNotExist()
            favorite = Favorite.objects.get(user=request.user, product=product)
            in_favorite = favorite.in_favorite
        except ObjectDoesNotExist:
            in_favorite = False
        finally:
            data['favorite'] = in_favorite

        return Response(data)


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
            result[-1]['username'] = review.user.username
            result[-1]['user_full_name'] = review.user.first_name + ' ' + review.user.last_name
            result[-1]['profile_img_url'] = review.user.profile_img_url
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
        review, _ = Review.objects.update_or_create(user=request.user, product=product, defaults=data)

        scores = Review.objects.filter(product=product).values_list('rating', flat=True)
        product.user_score = sum(scores) / len(scores)
        product.review_count = len(scores)
        product.save()

        return Response(ReviewReadSerializer(review).data)


class FavoriteCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        product_ids = (
            Favorite.objects.filter(user=request.user.id, in_favorite=True)
            .values_list('product', flat=True)
        )
        products = Product.objects.filter(name__in=list(product_ids))
        result = []
        for product in products:
            product_serializer = ProductReadSerializer(product)
            data = product_serializer.data
            try:
                data['ingredients'] = json.loads(data['ingredients'])
            except:
                pass
            result.append(data)
        return Response(result)

    def post(self, request):
        if 'code' in request.query_params:
            barcode = get_object_or_404(Barcode, code=request.query_params['code'])
            product = barcode.product
        elif 'product' in request.query_params:
            product = get_object_or_404(Product, product=request.query_params['product'])

        serializer = FavoriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        Favorite.objects.update_or_create(
            product=product,
            user=request.user,
            defaults={
                'in_favorite': serializer.validated_data['in_favorite']
            }
        )
        return Response(serializer.validated_data)


class AnalyzeIngredientImageView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = IngredientImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        ingredient_names = process_base64(data['content'])
        ingredients = []
        for ingredient_name in ingredient_names:
            qs = Ingredient.objects.filter(inci_name=ingredient_name)
            if qs.exists():
                ingredient = qs.first()
            else:
                try:
                    ingredient = Ingredient.objects.filter(inn_name=ingredient_name).first()
                except:
                    continue
            ingredients.append([ingredient, -1])

        return Response(ingredient_names)


class IngredientView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        ingredients = request.data #json.loads(request.data)
        for ingredient in ingredients:
            qs = Ingredient.objects.filter(inci_name__iexact=ingredient['inci_name'])
            qs.update(**ingredient)
        return Response('OK')
