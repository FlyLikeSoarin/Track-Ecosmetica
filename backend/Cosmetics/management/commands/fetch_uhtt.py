from django.core.management.base import BaseCommand, CommandError
from Cosmetics.models import Barcode, Product

import csv
import os
import py7zr
import requests
import shutil


allowed_categories = set([
    '5586', # косметика
    '7943', # cosmetic
    '336078',
    '1380354',
    '1382789',
    '1412',
    '897047',
    '891338',
    '331979',
    '961989',
    '32377',
    '1045095',
    '28',
    '203',
    '179868',
    '2472',
    '535866',
    '1039',
    '1833118',
    '533906',
    '337447',
    '1249',
    '391607',
    '366026',
    '901504',
    '1105',
    '16248',
    '4829069',
    '499',
    '2439',
    '1118103',
    '130',
    '1069',
    '2588',
    '397231',
    '4385',
    '954473',
    '3068',
    '500117',
    '19414',
    '5984',
    '407',
    '1051',
    '5203',
    '362341',
    '273',
    '3702',
    '209',
    '264868',
    '391489',
    '391481',
    '264261',
    '264298',
    '3007277',
    '488884',
    '466892',
    '362160',
    '315',
    '2187',
    '265894',
    '476130',
    '9484',
    '597',
    '354524',
    '177433',
    '5586',
    '297285',
    '1780133',
    '297281',
    '297279',
    '1199886',
    '336150',
    '19704',
    '478346',
    '278498',
    '1395',
    '664',
    '10304',
    '1438',
    '331154',
    '1682',
    '2642',
    '1053',
    '486605',
    '486634',
    '461',
    '490',
    '181499',
    '339961',
    '361847',
    '4015',
    '225',
    '1041826',
    '146',
    '366',
    '6903',
    '2229142',
    '2418099',
    '1382774',
    '1382778',
    '1457193',
    '900735',
    '1374136',
    '7943',
    '978419',
    '1009426',
    '1540683',
    '1370357',
    '1382000',
    '297057',
    '1386',
    '34715',
    '260768',
    '260996',
    '401',
    '454616'
])


class Command(BaseCommand):
    help = '''Fetches latest release of UHHT barcode database and save all cosmetics related entries'''
    filename = 'uhtt_barcode_ref_all'

    def handle(self, *args, **options):
        csv.field_size_limit(10 ** 8)
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
