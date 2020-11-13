# Generated by Django 3.0.6 on 2020-11-13 08:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('Cosmetics', '0020_auto_20201112_0942'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='user_score',
            field=models.IntegerField(default=-1),
        ),
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('in_favorite', models.BooleanField(default=False)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Cosmetics.Product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddIndex(
            model_name='favorite',
            index=models.Index(fields=['user', 'product'], name='Cosmetics_f_user_id_afe5ca_idx'),
        ),
        migrations.AddConstraint(
            model_name='favorite',
            constraint=models.UniqueConstraint(fields=('user', 'product'), name='favorite_unique_user_product'),
        ),
    ]