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

ecogolik_search_url = 'https://ecogolik.ru/search/index.php?q={query}'

ecogolik_product_url = 'https://ecogolik.ru{href}'

ecogolik_category_to_field = {
    'Происхождение': 'background',
    'Применение': 'usage',
    'Опасность': 'safety',
}


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


class EcogolikSearchParser(HTMLParser):
    def __init__(self, ingredient_name):
        super().__init__()
        self.tag_stack = list()
        self.next_data = None
        self.data = ''
        self.ingredient_name = ingredient_name.lower().strip()
        self.href = None
        self.candidte_href = None

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append((tag, attrs))
        attrs_dict = {key: value for key, value in attrs}

        if len(self.tag_stack) >= 2:
            parent_tag = self.tag_stack[-2][0]
            parent_attrs_dict = {key: value for key, value in self.tag_stack[-2][1]}
            if 'class' in parent_attrs_dict and 'href' in attrs_dict:
                if parent_tag == 'div' and 'search-item__title' in parent_attrs_dict['class']:
                    if tag == 'a' and 'search-item__link' in attrs_dict['class']:
                        href = attrs_dict['href']
                        prefix = '/sostav_kosmetika/'
                        if prefix in href:
                            self.candidte_href = href
                            self.next_data = 'search_title'

    def handle_endtag(self, tag):
        if self.next_data is not None and tag == 'a':
            letters = ' abcdefghijklmnopqrstuvwxyz'
            self.data = ''.join([c for c in self.data.lower() if c in letters]).strip()
            if self.data == self.ingredient_name:
                self.href = self.candidte_href
            self.next_data = None
            self.data = ''
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            self.data += data


class EcogolikProductParser(HTMLParser):
    def __init__(self, product={}):
        super().__init__()
        self.tag_stack = list()
        self.next_data = None
        self.category_name = None
        self.product = defaultdict(lambda: '')
        for key, value in product.items():
            self.product[key] = value

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append((tag, attrs))
        attrs_dict = {key: value for key, value in attrs}

        if len(self.tag_stack) >= 2:
            parent_tag = self.tag_stack[-2][0]
            parent_attrs_dict = {key: value for key, value in self.tag_stack[-2][1]}
            if 'class' in parent_attrs_dict and 'src' in attrs_dict:
                if parent_tag == 'div' and 'rating-apple' in parent_attrs_dict['class']:
                    if tag == 'img':
                        img_url = attrs_dict['src']
                        rating_start = img_url.find('/app/images/rating_on_')
                        prefix_len = len('/app/images/rating_on_')
                        self.product['total_score'] = 2 * int(img_url[rating_start + prefix_len:][:1])
            if 'class' in parent_attrs_dict:
                if parent_tag == 'div' and 'ingredient-info__category' in parent_attrs_dict['class']:
                    if tag == 'span':
                        self.next_data = 'category_name'
                    if tag == 'p':
                        self.next_data = 'category_text'

    def handle_endtag(self, tag):
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            if self.next_data == 'category_name':
                self.category_name = data
            elif self.next_data == 'category_text':
                self.product[ecogolik_category_to_field[self.category_name]] = data
                self.category_name = None
            self.next_data = None


def update_ingredient(ingredient, chosen_ingredient=None, only_ecogolik=True):
    try:
        ingredient_name = str(ingredient)
    except IndexError:
        return ingredient
    chosen_ingredient = {}

    r = requests.get(ecogolik_search_url.format(query=ingredient_name))
    parser = EcogolikSearchParser(ingredient_name)
    parser.feed(r.text)
    parser.close()

    if parser.href is not None:
        r = requests.get(ecogolik_product_url.format(href=parser.href))
        parser = EcogolikProductParser(chosen_ingredient)
        parser.feed(r.text)
        parser.close()
        chosen_ingredient = parser.product

    if only_ecogolik:
        time.sleep(random.uniform(attempts_pause_time, attempts_pause_time * 2))
        return chosen_ingredient

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
