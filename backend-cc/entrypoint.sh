#!/bin/bash
# entrypoint.sh

# Example setup: Perform migrations, load data, then run server
python manage.py migrate
python manage.py loaddata dummy-users.json
python manage.py runserver 0.0.0.0:8000