from django.core.management.base import BaseCommand, CommandError
from Cosmetics.models import Barcode, Product

import csv
import os
import py7zr
import requests
import shutil


allowed_categories = [
    '5586', # косметика
    '241824', # Лекарственные средства
    '7943', # cosmetic
    '336078', # Personal Hygiene
    '1380354' # FACIAL CLEANER, WASH & SCRUB
]


class Command(BaseCommand):
    help = '''Fetches latest release of UHHT barcode database and save all cosmetics related entries'''
    filename = 'uhtt_barcode_ref_all'

    def handle(self, *args, **options):
        if not os.path.exists(f'{self.filename}.7z'):
            self.download()
        if not os.path.exists(f'{self.filename}.csv'):
            self.unpack()
        self.parse()

    def download(self):
        self.stdout.write('Downloading UHHT archive from github')
        try:
            url = "https://github.com/papyrussolution/UhttBarcodeReference/releases/latest"
            r_url = requests.get(url).url
            download_url = r_url.replace('tag', 'download') + f'/{self.filename}.7z'

            with requests.get(download_url, stream=True) as r_download:
                with open(f'{self.filename}.7z', 'wb') as f:
                    shutil.copyfileobj(r_download.raw, f)

            self.stdout.write(self.style.SUCCESS('- Download complete'))
        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR('- Download failed: resource unavailable'))
            raise e

    def unpack(self):
        self.stdout.write('Unpacking UHHT archive')
        try:
            with py7zr.SevenZipFile(f'{self.filename}.7z', mode='r') as archive:
                archive.extractall()

            self.stdout.write(self.style.SUCCESS('- Unpacking complete'))
        except py7zr.Bad7zFile as e:
            self.stdout.write(self.style.ERROR('- Unpacking failed: file is corrupted'))
            raise e
        except IOError as e:
            self.stdout.write(self.style.ERROR('- Unpacking failed: file is not readable'))
            raise e

    def parse(self):
        self.stdout.write('Parsing content')
        with open(f'{self.filename}.csv', 'r') as f:
            reader = csv.reader(f, delimiter='\t')
            for row in reader:
                if len(row) < 4:
                    continue
                uhht_id, code, name, category_id = row[:4]

                if category_id in allowed_categories:
                    brand_id = '' if len(row) < 6 else row[5]
                    brand_name = '' if len(row) < 7 else row[6]

                    product = Product.objects.get_or_create(
                        name=name,
                        brand_name=brand_name,
                        defaults={
                            # 'universe_htt': uhht_id,
                            # 'brand_htt': brand_id
                        })
                    Barcode.objects.get_or_create(
                        code=code,
                        code_format='UPCEAN',
                        product=product[0])
