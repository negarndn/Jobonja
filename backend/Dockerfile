# Pull base image
FROM python:3.10-slim-buster

# Set environment variables
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


# Set work directory
WORKDIR /backend

# Install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt



# Copy project
COPY . .

# Configure Django settings for PostgreSQL
ENV DATABASE_HOST=172.17.0.2
ENV DATABASE_PORT=5432
ENV DATABASE_NAME=postgres
ENV DATABASE_USER=postgres
ENV DATABASE_PASSWORD=Pass2020!


CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000"]

#, "--host", "0.0.0.0"
#ENTRYPOINT [".entrypoint.sh"]
