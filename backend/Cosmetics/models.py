from django.db import models
from django.db.models.constraints import UniqueConstraint


class Barcode(models.Model):
    class Meta:
        indexes = [models.Index(fields=['code', 'code_format']),]
        constraints = [UniqueConstraint(fields=['code', 'code_format'], name='unique_pair')]

    code = models.CharField(max_length=50, db_index=True)
    code_format = models.CharField(max_length=10, default='-', verbose_name='format of barcode')
    product = models.ForeignKey('product', on_delete=models.CASCADE)


class Product(models.Model):
    name = models.CharField(max_length=100, primary_key=True, db_index=True)
    brand_name = models.CharField(max_length=100)
    universe_htt_id = models.CharField(max_length=50, null=True, blank=True)
    brand_htt_id = models.CharField(max_length=50, null=True, blank=True)
