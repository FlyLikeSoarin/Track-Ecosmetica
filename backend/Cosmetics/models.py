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

    def __str__(self):
        return self.code


class Product(models.Model):
    class Meta:
        indexes = [models.Index(fields=['name', 'brand_name']),]
        constraints = [
            UniqueConstraint(fields=['name', 'brand_name'], name='product_unique_name_brand_name')]

    name = models.CharField(max_length=100, primary_key=True, db_index=True)
    brand_name = models.CharField(max_length=100, blank=True)
    img_url = models.CharField(max_length=250, blank=True)
    description = models.TextField(blank=True)
    ingredients = models.TextField(blank=True)

    eco_score = models.IntegerField(default=-1)
    safety_score = models.IntegerField(default=-1)
    zoo_score = models.IntegerField(default=-1)
    total_score = models.IntegerField(default=-1)
    user_score = models.IntegerField(default=-1)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    inci_name = models.TextField(db_index=True, blank=True)
    inn_name = models.TextField(db_index=True, blank=True)
    cas_number = models.CharField(max_length=100, db_index=True, unique=True, null=True)
    ec_number = models.CharField(max_length=100, db_index=True, unique=True, null=True)
    description = models.TextField()

    # CasDNA information
    cos_dna_url = models.TextField(blank=True)
    cos_dna_description = models.TextField(blank=True)
    cos_dna_safety_score = models.CharField(blank=True, max_length=25)

    # CosmeticsInfo information
    cosmetics_info_url = models.TextField(blank=True)
    cosmetics_info_scientific_facts = models.TextField(blank=True)
    cosmetics_info_safety_info = models.TextField(blank=True)
    cosmetics_info_more_safety_info = models.TextField(blank=True)
    cosmetics_info_scientific_info = models.TextField(blank=True)
    cosmetics_info_resources = models.TextField(blank=True)
    cosmetics_info_description = models.TextField(blank=True)
    def __str__(self):
        return [i for i in [self.inci_name, self.inn_name] if i!=''][0]



class History(models.Model):
    product = models.ForeignKey('Cosmetics.Product', on_delete=models.CASCADE)
    user = models.ForeignKey('Users.User', on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    def __str__(self):
        return f'{str(self.user)} viewed {str(self.product)} at {str(self.timestamp)}'


class Review(models.Model):
    product = models.ForeignKey('Cosmetics.Product', on_delete=models.CASCADE)
    user = models.ForeignKey('Users.User', on_delete=models.CASCADE, null=True)
    title = models.TextField(blank=True)
    review = models.TextField(blank=True)
    rating = models.IntegerField()

    def __str__(self):
        return f'{self.title} (Rating: {self.rating})'

class Favorite(models.Model):
    class Meta:
        indexes = [models.Index(fields=['user', 'product']),]
        constraints = [
            UniqueConstraint(fields=['user', 'product'], name='favorite_unique_user_product')
        ]

    product = models.ForeignKey('Cosmetics.Product', on_delete=models.CASCADE)
    user = models.ForeignKey('Users.User', on_delete=models.CASCADE)
    in_favorite = models.BooleanField(default=False)

    def __str__(self):
        return '{} {} {} to favorite'.format(
            str(user),
            'added' if in_favorite else 'not added',
            str(product),
        )

# class ReviewLike(models.Model):
#     class Meta:
#         indexes = [models.Index(fields=['user', 'review']),]
#         constraints = [
#             UniqueConstraint(fields=['user', 'review'], name='review_like_unique_user_review')
#         ]
#
#     review = models.ForeignKey('Cosmetics.Review', on_delete=models.CASCADE)
#     user = models.ForeignKey('Users.User', on_delete=models.CASCADE)
#     likes = models.models.BooleanField(default=False)
#
#     def __str__(self):
#         return '{} {} {} to favorite'.format(
#             str(user),
#             'liked' if in_favorite else 'not liked',
#             str(review),
#         )
