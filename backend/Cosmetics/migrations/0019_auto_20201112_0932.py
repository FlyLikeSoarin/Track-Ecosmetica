# Generated by Django 3.0.6 on 2020-11-12 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0018_auto_20201112_0929'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='cas_dna_safety_score',
            field=models.CharField(blank=True, max_length=25),
        ),
    ]
