#! /bin/bash

if [ ! -f ./.django-pid ]; then
  nohup python3 manage.py runserver 0.0.0.0:8005 > /dev/null 2>&1 &
  echo $! > .django-pid
  echo 'Started!'
else
  echo 'Already working or was not stopped correctly'
fi
