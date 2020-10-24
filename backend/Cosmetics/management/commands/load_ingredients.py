from django.core.management.base import BaseCommand, CommandError
from Cosmetics.models import Ingredient

import csv
import os
import json


class Command(BaseCommand):
    source_file = '__data/ingredients.csv'


    def handle(self, *args, **options):
        self.stdout.write(f'Loading ingredients')
        if os.path.exists(self.source_file):
            with open(self.source_file, 'r') as f:
                reader = csv.reader(f, delimiter=',')
                i = len(next(reader, None))
                for row in reader:
                    Ingredient.objects.update_or_create(
                        cas_number=(row[4].strip() if row[4].strip() not in ['', '-'] else None),
                        ec_number=None ,
                        defaults={
                            "inci_name": row[1].strip(),
                            "inn_name": row[2].strip(),
                            "description": row[6].strip()
                        }
                    )
        #             _, tags, question, answers, answer, trivia = row
        #             tags = tags.split()
        #             answers = answers.split('\n')
        #             for tag in tags:
        #                 description = self.tag_to_descr[tag] if tag in self.tag_to_descr else tag
        #                 TrainerBlockTag.objects.update_or_create(
        #                     tag=tag, description=description)
        #
        #             question, _ = TrainerBlock.objects.update_or_create(
        #                 question=question, defaults={
        #                     'answers': json.dumps(answers, ensure_ascii=False),
        #                     'valid_answers': json.dumps([answer], ensure_ascii=False),
        #                     'trivia': trivia,
        #                     'section': section})
        #             question.tags.set(TrainerBlockTag.objects.filter(tag__in=tags))
        #             question.save()
        #         self.stdout.write(self.style.SUCCESS(
        #             f'- Section {section} loaded successfully'))
        # else:
        #     self.stdout.write(self.style.ERROR(
        #         f'- No file {section}.csv in {self.source_folder} directory'))
