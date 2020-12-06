# Generated by Django 3.0.6 on 2020-11-24 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0023_review_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='background',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='safety',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='total_score',
            field=models.IntegerField(blank=True, default=-1),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='usage',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]