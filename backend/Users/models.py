from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    profile_img_url = models.CharField(max_length=250, blank=True)
