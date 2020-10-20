from django.contrib.auth.models import UserManager
from django.utils import timezone

from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User


class UserCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        other_fields = {
            item[0]:item[1]
            for item in validated_data.items()
            if item[0] not in ['username', 'password']
        }
        # Really bad version of user creation
        user = User.objects.create(username=username, password=password)
        user.set_password(password)
        user.last_login=timezone.now()
        user.save()
        token = Token.objects.create(user=user)
        return user


class UnprotectedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        extra_kwargs = { 'username': {'validators': []}, }
        fields = '__all__'
        read_only = True


class ProtectedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        extra_kwargs = { 'username': {'validators': []}, }
        exclude = ['password']
        read_only = True
