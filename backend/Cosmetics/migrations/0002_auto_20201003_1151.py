# Generated by Django 3.0.6 on 2020-10-03 11:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0001_initial'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='barcode',
            name='unique_pair',
        ),
        migrations.RemoveIndex(
            model_name='barcode',
            name='Cosmetics_b_code_2b3aa2_idx',
        ),
        migrations.RenameField(
            model_name='barcode',
            old_name='format',
            new_name='code_format',
        ),
        migrations.AddIndex(
            model_name='barcode',
            index=models.Index(fields=['code', 'code_format'], name='Cosmetics_b_code_36eaa0_idx'),
        ),
        migrations.AddConstraint(
            model_name='barcode',
            constraint=models.UniqueConstraint(fields=('code', 'code_format'), name='unique_pair'),
        ),
    ]
