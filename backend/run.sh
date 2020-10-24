#! /bin/bash

if [ ! -f ./.django-pid ]; then
  key_path=$(realpath ../Track-Ecosmetics-gcv-key.json)
  export GOOGLE_APPLICATION_CREDENTIALS="$key_path"
  nohup python3 manage.py runserver 0.0.0.0:8005 > /dev/null 2>&1 &
  echo $! > .django-pid
  echo 'Started!'
else
  echo 'Already working or was not stopped correctly'
fi
