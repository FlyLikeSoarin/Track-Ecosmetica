import difflib
import io
import re
import base64

from collections import defaultdict
from unidecode import unidecode
from google.cloud import vision


def load_img_from_base64(base64_str):
    if isinstance(base64_str, str):
        base64_str = bytes(base64_str, "ascii")
    return base64.decodebytes(base64_str)


def load_img_from_file(path):
    with io.open(path, 'rb') as file:
        return file.read()


def cloud_vision_compute(img):
    client = vision.ImageAnnotatorClient()
    image = vision.Image(content=img)
    return client.document_text_detection(image, image_context={"language_hints": ["en"]})


def save_result(result):
    with io.open('result.txt', 'w') as file:
        file.write(str(result))

class TextProcessor:
    entry_tokens_variant_sets = [  # [unidecode(word) for word in [
        list('ingredients'),
        ['c','o','c', 'tr', 'a', 'bs'],
        list('sostav'),
        ['c', 'k', 'n', 'a', 'p'],
        list('sklad'),
        list('tarkibi'),
    ]

    consecutive_misses_threshold = 3

    def __init__(self, ingredient_list_path):
        self.ingredients = []
        with io.open(ingredient_list_path, 'r') as ingredients:
            for ingredient in ingredients:
                self.ingredients.append(ingredient.strip().lower())
        self.make_entry_tokens()

    def make_entry_tokens(self):
        self.entry_tokens = []
        for variant_set in self.entry_tokens_variant_sets:
            variants = ['']
            for position in variant_set:
                next_variants = []
                for letter in position:
                    next_variants += [word + letter for word in variants]
                variants = next_variants
            self.entry_tokens += variants

    def find_entry_token(self, text):
        words = re.sub('\W', ' ', text).split()
        match_count = defaultdict(lambda: 0)
        for entry_token in self.entry_tokens:
            matches = difflib.get_close_matches(entry_token, words, n=5, cutoff=0.8)
            for match in matches:
                match_count[match] += 1

        token_indexes = []
        for match in sorted(match_count.items(), key=lambda x: x[1]):
            token_indexes.append(self.validate_entry_token(text, match[0]))
        token_indexes.sort(key=lambda x:x[0], reverse=True)
        return token_indexes[0]

    def validate_entry_token(self, text, candidate_token):
        token_len = len(candidate_token)
        index = -token_len
        max_score = 0
        max_score_index = 0
        try:
            while max_score <= 0.6:
                index = text[index + token_len:].index(candidate_token)
                suffix = self.remove_entry_token(text, index)
                candidate_ingredients = self.split_into_ingredients(suffix)[:10]

                total_found = 0
                for candidate in candidate_ingredients:
                    ingredient, found = self.check_ingredient(candidate)
                    total_found += 1 if found else 0

                score = total_found / len(candidate_ingredients)
                if score > max_score:
                    max_score = score
                    max_score_index = index
            return max_score, max_score_index

        except ValueError:
            return max_score, max_score_index

    def remove_entry_token(self, text, token_index):
        try:
            return text[token_index + text[token_index:token_index + 100].index(':') + 1:]
        except ValueError:
            return ' '.join(text[token_index:].split()[1:])

    def split_into_ingredients(self, text):
        words = re.sub('\.', ',', text).split(', ')
        return [word.strip() for word in words]

    def check_ingredient(self, candidate_ingredient):
        matches = difflib.get_close_matches(candidate_ingredient, self.ingredients, n=1, cutoff=0.8)
        if len(matches) > 0:
            return matches[0], True
        else:
            return None, False

    def to_ascii(self, text):
        ascii_text = unidecode(text.lower())
        return re.sub('@', 'a', ascii_text)

    def Process(self, text):
        text = self.to_ascii(text)
        score, entry_index = self.find_entry_token(text)
        suffix = self.remove_entry_token(text, entry_index)
        candidate_ingredients = self.split_into_ingredients(suffix)

        consecutive_misses = 0
        found_ingredients = []
        for candidate in candidate_ingredients:
            ingredient, found = self.check_ingredient(candidate)
            if found:
                consecutive_misses = 0
                found_ingredients.append(ingredient)
            else:
                consecutive_misses += 1
                if consecutive_misses >= self.consecutive_misses_threshold:
                    break
        return found_ingredients


def process_base64(base64_str):
    result = cloud_vision_compute(load_img_from_base64(base64_str))
    processor = TextProcessor('./ingredient_list.txt')
    return processor.Process(result.text_annotations[0].description)


# result = cloud_vision_compute(load_img_from_file('source/source3.png'))
# processor = TextProcessor('ingredient_list.txt')
# ingredients = processor.Process(result.text_annotations[0].description)
# print(ingredients)
