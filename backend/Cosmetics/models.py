from django.db import models
from django.db.models.constraints import UniqueConstraint


class Barcode(models.Model):
    class Meta:
        indexes = [models.Index(fields=['code', 'code_format']),]
        constraints = [
            UniqueConstraint(fields=['code', 'code_format'], name='barcode_unique_code_code_format')]

    code = models.CharField(max_length=50, db_index=True)
    code_format = models.CharField(max_length=10, default='UPCEAN', verbose_name='format of barcode')
    product = models.ForeignKey('product', on_delete=models.CASCADE)


class Product(models.Model):
    class Meta:
        indexes = [models.Index(fields=['name', 'brand_name']),]
        constraints = [
            UniqueConstraint(fields=['name', 'brand_name'], name='product_unique_name_brand_name')]

    name = models.CharField(max_length=100, primary_key=True, db_index=True)
    brand_name = models.CharField(max_length=100, blank=True)
    universe_htt = models.CharField(max_length=50, null=True, blank=True)
    brand_htt = models.CharField(max_length=50, null=True, blank=True)
