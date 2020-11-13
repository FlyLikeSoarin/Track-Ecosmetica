# Generated by Django 3.0.6 on 2020-11-12 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0017_auto_20201112_0816'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ingredient',
            old_name='cosmetics_info_what_is_it',
            new_name='cosmetics_info_description',
        ),
        migrations.AddField(
            model_name='ingredient',
            name='cosmetics_info_more_safety_info',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='cosmetics_info_resources',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='ingredient',
            name='cosmetics_info_scientific_info',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='cas_dna_safety_score',
            field=models.IntegerField(blank=True),
        ),
    ]
