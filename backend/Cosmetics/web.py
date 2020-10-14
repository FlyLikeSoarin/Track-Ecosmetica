import re
import requests
import time

from html.parser import HTMLParser


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
                    if tag == 'img'  and 'src' in attrs_dict and 'uri' not in self.product:
                        self.product['uri'] = attrs_dict['src']
                if parent_tag == 'div' and 'product-score' in parent_attrs_dict['class']:
                    if tag == 'img'  and 'src' in attrs_dict and 'score' not in self.product:
                        hits = re.findall('score-.+-', attrs_dict['src'])
                        if hits:
                            self.product['score'] = hits[0][6:-1]
                        else:
                            self.product['score'] = -1
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


def get_product_or_fetch(product_name, brand_name):
    pass