from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

from .serializers import UserCreationSerializer, ProtectedUserSerializer, UnprotectedUserSerializer
from .models import User


class AuthView(APIView):
    def get(self, request):
        serializer = UnprotectedUserSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        user = get_object_or_404(User, username=serializer.validated_data['username'])
        user.last_login=timezone.now()
        user.save()

        if user.check_password(serializer.validated_data['password']):
            token, created = Token.objects.get_or_create(user=user)
            return Response({'Token': str(token)})
        else:
            raise AuthenticationFailed()

    def post(self, request):
        serializer = UserCreationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'Token': str(token)})



class RetrieveUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, username=None):
        if username is not None:
            user = get_object_or_404(User, username=username)
        else:
            user = request.user
        serializer = ProtectedUserSerializer(user)
        return Response(serializer.data)

    def post(self, request, username=None):
        if username is not None:
            user_queryset = User.objects.filter(username=username)
        else:
            user_queryset = User.objects.filter(username=request.user.username)
        pk = user_queryset.first().pk

        serializer = ProtectedUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        del data['username']
        user = user_queryset.update(**data)

        return Response(ProtectedUserSerializer(User.get(pk=pk)).data)
