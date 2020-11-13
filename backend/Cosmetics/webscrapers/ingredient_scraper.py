import random
import re
import requests
import time
import base64

from html.parser import HTMLParser
from difflib import SequenceMatcher
from google.cloud import vision
from collections import defaultdict


# Settings
max_attempts = 10
attempts_pause_time = 2.500
cos_dna_search_url = 'http://www.cosdna.com/eng/stuff.php?q={query}'
cosmetics_info_ingredient_url = 'https://www.cosmeticsinfo.org/ingredient/{ingredient}'


class CosDNASearchParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tag_stack = list()
        self.products = list()
        self.next_data = None

    @property
    def product(self):
        if self.products:
            return self.products[-1]
        else:
            None

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append((tag, attrs))
        attrs_dict = {key: value for key, value in attrs}
        print(attrs_dict)
        if 'class' in attrs_dict and 'href' in attrs_dict:
            if tag == 'a' and 'd-block' in attrs_dict['class']:
                self.products.append({
                    'cos_dna_url': attrs_dict['href'],
                    'name': None,
                })
                self.next_data = None

        if len(self.tag_stack) >= 2:
            parent_tag = self.tag_stack[-2][0]
            parent_attrs_dict = {key: value for key, value in self.tag_stack[-2][1]}
            if 'class' in parent_attrs_dict and 'class' in attrs_dict:
                if parent_tag == 'a' and 'd-block' in parent_attrs_dict['class']:
                    if tag == 'span' and 'text-info' in attrs_dict['class']:
                        self.next_data = 'name'

    def handle_endtag(self, tag):
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            self.product[self.next_data] = data.strip()
            self.next_data = None


class CosDNAProductParser(HTMLParser):
    def __init__(self, product={}):
        super().__init__()
        self.tag_stack = list()
        self.next_data = None
        self.product = defaultdict(lambda: '')
        for key, value in product.items():
            self.product[key] = value

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append((tag, attrs))
        attrs_dict = {key: value for key, value in attrs}
        if len(self.tag_stack) >= 2:
            parent_tag = self.tag_stack[-2][0]
            parent_attrs_dict = {key: value for key, value in self.tag_stack[-2][1]}
            if 'class' in parent_attrs_dict and 'class' in attrs_dict:
                if parent_tag == 'div' and 'chem' in parent_attrs_dict['class']:
                    if tag == 'div'  and 'linkb1' in attrs_dict['class'] and 'ls-2' in attrs_dict['class']:
                        self.next_data = 'cos_dna_description'
            if 'class' in attrs_dict:
                if parent_tag == 'div':
                    if tag == 'span'  and 'safety safety' in attrs_dict['class']:
                        self.next_data = 'cos_dna_safety_score'

    def handle_endtag(self, tag):
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            sep = '' if self.product[self.next_data] == '' else ' '
            self.product[self.next_data] += sep + data.strip()
            self.next_data = None


class CosmeticsInfoProductParser(HTMLParser):
    def __init__(self, product={}):
        super().__init__()
        self.tag_stack = list()
        self.next_data = None
        self.product = defaultdict(lambda: '')
        for key, value in product.items():
            self.product[key] = value

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append({'tag': tag, 'attrs': attrs, 'text_section_border': False})
        attrs_dict = {key: value for key, value in attrs}

        if 'class' in attrs_dict and tag == 'div':
            cls = attrs_dict['class']
            prefix = 'field--name-field-messages-'
            if cls.find(prefix) >= 0:
                self.tag_stack[-1]['text_section_border'] = True
                self.next_data = cls[cls.find(prefix) + len(prefix):].split()[0].replace('-', '_')
        if 'id' in attrs_dict and tag == 'div':
            if attrs_dict['id'] == 'group-overview-left':
                self.next_data = 'description'

    def handle_endtag(self, tag):
        if self.tag_stack[-1]['text_section_border']:
            self.next_data = None
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            sep = '' if self.product['cosmetics_info_' + self.next_data] == '' else ''
            self.product['cosmetics_info_' + self.next_data] += sep + data


def update_ingredient(ingredient, chosen_ingredient=None):
    try:
        ingredient_name = str(ingredient)
    except IndexError:
        return ingredient

    chosen_ingredient = {}
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A'}
    r = requests.get(cos_dna_search_url.format(query=ingredient_name), headers=headers)
    if r.status_code != 200 or r.url.startswith('http://www.cosdna.com/eng/stuff.php?q='):
        pass
    else:
        parser = CosDNAProductParser(chosen_ingredient)
        parser.feed(r.text)
        parser.close()
        chosen_ingredient = parser.product
        chosen_ingredient['cos_dna_url'] = r.url
        if 'cos_dna_safety_score' in chosen_ingredient:
            score = chosen_ingredient['cos_dna_safety_score']
            score = list(map(lambda x: int(x), score.split()))
            chosen_ingredient['cos_dna_safety_score'] = str(int(sum(score) / len(score)))

    # Parsing CosmeticsInfo ingredient page
    formated_name = ingredient_name.lower().replace(' ', '-').replace(',', '')
    r = requests.get(cosmetics_info_ingredient_url.format(ingredient=formated_name))
    if r.status_code != 200:
        pass
    else:
        parser = CosmeticsInfoProductParser(chosen_ingredient)
        parser.feed(r.text)
        parser.close()
        chosen_ingredient = parser.product
        chosen_ingredient['cosmetics_info_url'] = r.url

    time.sleep(random.uniform(attempts_pause_time, attempts_pause_time * 2))
    return chosen_ingredient
