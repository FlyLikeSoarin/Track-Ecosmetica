import random
import re
import requests
import time
import base64

from html.parser import HTMLParser
from difflib import SequenceMatcher
from google.cloud import vision


# Settings
max_attempts = 10
attempts_pause_time = 0.500


class EWSSearchParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tag_stack = list()
        self.products = list()
        self.next_data = None
        self.num_found = None

    @property
    def product(self):
        if self.products:
            return self.products[-1]
        else:
            None

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append((tag, attrs))
        attrs_dict = {key: value for key, value in attrs}

        if 'class' not in attrs_dict:
            pass
        elif 'product-tile' in attrs_dict['class']:
            self.products.append({})
            pass
        elif self.product is not None:
            # print(attrs_dict['class'], attrs_dict.keys())
            if 'product-score-img' in attrs_dict['class'] and 'src' in attrs_dict:
                hits = re.findall('score-.+-', attrs_dict['src'])
                self.product['score'] = hits[0][6:-1] if hits else -1
            if 'product-company' in attrs_dict['class']:
                self.next_data = 'brand'
            if 'product-name' in attrs_dict['class']:
                self.next_data = 'name'

        if 'href' not in attrs_dict:
            pass
        elif self.product is not None:
            if len(self.product.items()) == 0 and tag == 'a':
                self.product['uri'] = attrs_dict['href']

        if len(self.tag_stack) >= 2:
            parent_tag = self.tag_stack[-2][0]
            parent_attrs_dict = {key: value for key, value in self.tag_stack[-2][1]}
            if 'class' in parent_attrs_dict:
                if parent_tag == 'section' and 'browse-search-header' in parent_attrs_dict['class']:
                    if tag == 'h1':
                        self.next_data = 'num_found'

    def handle_endtag(self, tag):
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            if self.next_data == 'num_found' and self.num_found is None:
                hits = re.findall('^\d+', data.strip())
                self.num_found = int(hits[0]) if hits else -1
            elif self.product is not None:
                self.product[self.next_data] = data.strip()
            self.next_data = None


class EWSProductParser(HTMLParser):
    def __init__(self, product={}):
        super().__init__()
        self.tag_stack = list()
        self.next_data = None
        self.product = product

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append((tag, attrs))
        attrs_dict = {key: value for key, value in attrs}

        if len(self.tag_stack) >= 2:
            parent_tag = self.tag_stack[-2][0]
            parent_attrs_dict = {key: value for key, value in self.tag_stack[-2][1]}
            if 'class' in parent_attrs_dict:
                if parent_tag == 'div' and 'product-image' in parent_attrs_dict['class']:
                    if tag == 'img'  and 'src' in attrs_dict and 'img_uri' not in self.product:
                        self.product['img_uri'] = attrs_dict['src']
                if parent_tag == 'div' and 'product-score' in parent_attrs_dict['class']:
                    if tag == 'img'  and 'src' in attrs_dict and 'score' not in self.product:
                        hits = re.findall('score-.+-', attrs_dict['src'])
                        if hits:
                            self.product['score'] = hits[0][6:-1]
                        else:
                            self.product['score'] = -1
                if parent_tag == 'td' and 'td-score' in parent_attrs_dict['class']:
                    if tag == 'img' and 'src' in attrs_dict:
                        if 'ingredient' not in self.product:
                            self.product['ingredient'] = list()

                        hits = re.findall('score-.+-', attrs_dict['src'])
                        if hits:
                            self.product['ingredient'].append(int(hits[0][6:-1]))
                        else:
                            self.product['ingredient'].append(-1)
                if parent_tag == 'div' and 'td-ingredient-interior' in parent_attrs_dict['class']:
                    if tag == 'a' and 'href' in attrs_dict:
                        self.next_data = 'ingredient'
                if parent_tag == 'div' and 'gauge-header-wrapper' in parent_attrs_dict['class']:
                    if tag == 'h2':
                        self.next_data = 'gauges'

        if 'class' in attrs_dict:
            if 'gauge_arrow' in attrs_dict['class']:
                hits = re.findall('orient_.+$', attrs_dict['class'])
                concerns = hits[-1][7:] if hits else 'unknown'
                self.product['gauges'].append((self.product['gauges'].pop(), concerns, ))


    def handle_endtag(self, tag):
        self.tag_stack.pop()

    def handle_data(self, data):
        if self.next_data is not None:
            if self.next_data not in self.product:
                self.product[self.next_data] = list()
            if self.next_data == 'ingredient':
                self.product['ingredient'][-1] = (self.product['ingredient'][-1], data.strip())
                self.next_data = None
                return
            self.product[self.next_data].append(data.strip())
            self.next_data = None


def fetch_product(product):
    r = requests.get(product['uri'])
    if r.status_code != 200:
        pass
    else:
        ews_parser = EWSProductParser(product)
        ews_parser.feed(r.text)
        ews_parser.close()
        return ews_parser.product


def search_product(query):
    uri_query = query.replace(' ', '+')
    r = requests.get(f'https://www.ewg.org/skindeep/search/?utf8=✓&search={uri_query}')
    if r.status_code != 200:
        pass
    else:
        ews_parser = EWSSearchParser()
        ews_parser.feed(r.text)
        ews_parser.close()
        return ews_parser.products, ews_parser.num_found


def is_word_allowed(word):
    hits = re.findall('[^\w&-]+', word) + re.findall('\d+', word)
    return len(hits) == 0


def severity_to_score(severity):
    return {'low': 10, 'moderate': 6, 'high': 2}[severity]


def get_product_or_fetch(product_name, brand_name):
    pure_brand_name = brand_name.strip()
    list_product_name = product_name.replace(pure_brand_name, '').split()
    list_product_name = [word for word in list_product_name if is_word_allowed(word)]
    pure_product_name = ' '.join(list_product_name)

    products, _ = search_product(f'{pure_brand_name} {pure_product_name}')
    products.sort(key=lambda p:\
        SequenceMatcher(None, p['name'], pure_product_name).ratio()\
        + SequenceMatcher(None, p['brand'], pure_brand_name).ratio())

    if products:
        return fetch_product(products[-1])
    else:
        return False


def image_to_text(img_base64_str):
    content = base64.decodebytes(bytes(img_base64_str, "acsii"))
    client = vision.ImageAnnotatorClient()
    image = vision.Image(content=content)
    return client.document_text_detection(image)
