# Generated by Django 3.0.6 on 2020-10-03 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0002_auto_20201003_1151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='brand_htt_id',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='universe_htt_id',
            field=models.CharField(max_length=50, null=True),
        ),
    ]