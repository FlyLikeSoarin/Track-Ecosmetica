# Generated by Django 3.0.6 on 2020-11-24 14:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Cosmetics', '0024_auto_20201124_1404'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ingredient',
            old_name='total_score',
            new_name='score',
        ),
    ]
