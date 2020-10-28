from django.core.management.base import BaseCommand, CommandError
from Cosmetics.models import Ingredient

import io


class Command(BaseCommand):
    source_file = '__data/ingredients.csv'


    def handle(self, *args, **options):
        self.stdout.write(f'Making list of ingredients')
        ingredients = Ingredient.objects.all()
        with io.open('./ingredient_list.txt', 'w') as file:
            for ingredient in ingredients:
                name = ingredient.inci_name if ingredient.inci_name != '' else ingredient.inn_name
                if name != '':
                    file.write(name + '\n')
