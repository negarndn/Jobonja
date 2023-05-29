#!/bin/sh
set -e

echo "Waiting for postgres..."

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done

echo "PostgreSQL started"

python manage.py migrate --noinput

python manage.py initsuperuser

python manage.py runserver

#python manage.py initsite
#
#python manage.py collectstatic --noinput

#if [ "$DJANGO_RUN_TEST" -eq "1" ]; then
#   python manage.py test
#fi

exec "$@"