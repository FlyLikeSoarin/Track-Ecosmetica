from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token

from .serializers import UserCreationSerializer, ProtectedUserSerializer, UnprotectedUserSerializer
from .serializers import VKAuthRequestSerializer
from .models import User
from .web import fetch_user


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

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        serializer = ProtectedUserSerializer(user)
        return Response(serializer.data)
