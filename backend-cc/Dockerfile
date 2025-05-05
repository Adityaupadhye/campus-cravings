# Use the official Python image as a base
FROM python:3.13.3-slim

# # Set environment variables for production
# ENV PYTHONUNBUFFERED 1
# ENV DJANGO_SETTINGS_MODULE=myproject.settings.production

# Set the working directory in the container
WORKDIR /app

# Setup for python mysqlclient
RUN apt-get update && apt-get install -y \
    python3-dev \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    libssl-dev \
    libffi-dev \
    gcc \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Copy the requirements file to the container
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# Copy the Django project files to the container
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the port on which Django runs
EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]

# Start the application with Gunicorn
# CMD ["gunicorn", "canteenapp.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
