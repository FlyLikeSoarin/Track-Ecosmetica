# Generated by Django 3.0.6 on 2020-11-12 09:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0019_auto_20201112_0932'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ingredient',
            old_name='cas_dna_description',
            new_name='cos_dna_description',
        ),
        migrations.RenameField(
            model_name='ingredient',
            old_name='cas_dna_safety_score',
            new_name='cos_dna_safety_score',
        ),
        migrations.RenameField(
            model_name='ingredient',
            old_name='cas_dna_url',
            new_name='cos_dna_url',
        ),
    ]