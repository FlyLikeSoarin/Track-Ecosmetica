from django.core.management.base import BaseCommand, CommandError

from Cosmetics.models import Ingredient
from Cosmetics.webscrapers.ingredient_scraper import update_ingredient


class Command(BaseCommand):

    def handle(self, *args, **options):
        self.stdout.write(f'Fetching ingredients')
        ingredients = Ingredient.objects.all().order_by('-inci_name')
        offset = 0
        no_info = 0
        for ingredient in ingredients[offset:]:
            self.stdout.write(f' > Fetching {str(ingredient)} offset {offset}')
            result = update_ingredient(ingredient)
            Ingredient.objects.filter(pk=ingredient.pk).update(**result)
            if len(dict(result)) > 0:
                self.stdout.write(self.style.SUCCESS(' >> Was able to fetch something'))
            else:
                self.stdout.write(self.style.ERROR(' >> No information'))
                no_info += 1
            offset += 1

            if offset % 100 == 0:
                self.stdout.write(f'========================')
                self.stdout.write(f'offset:  {offset}')
                self.stdout.write(f'no info: {no_info}')
                success_ratio = no_info / offset
                if success_ratio > 0.8:
                    self.stdout.write(self.style.SUCCESS(f'success_ratio:  {success_ratio}'))
                else:
                    self.stdout.write(self.style.ERROR(f'success_ratio:  {success_ratio}'))
                self.stdout.write(f'========================')
