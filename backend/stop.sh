#! /bin/bash

if [ -f ./.django-pid ]; then
  db_pid=$(cat ./.django-pid)
  echo "Database pid: ${db_pid} "
  kill $db_pid
  echo 'Stopped!'
  rm ./.django-pid
else
  echo 'No working db found'
fi
