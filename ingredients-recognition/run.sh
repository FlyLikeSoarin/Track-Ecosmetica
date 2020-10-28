#! /bin/bash

key_path=$(realpath ../Track-Ecosmetics-gcv-key.json)
export GOOGLE_APPLICATION_CREDENTIALS="$key_path"
python3 analyze_ingredients.py
