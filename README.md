# Jobonja Backend
Jobonja is a job portal website built using Django Rest Framework, JWT, and PostgreSQL as its primary database. This repository contains the backend code for the Jobonja website.

## Prerequisites
Before running the project, you need to have the following software installed on your system:

- Python 3.x
- PostgreSQL
## Installation
Clone this repository on your local machine using the following command:

```
git clone https://github.com/negarndn/OOD-Project.git
```
Create a virtual environment using the following command:

```
python3 -m venv env
```
Activate the virtual environment using the following command:

```
source env/bin/activate
```
Install the required dependencies using the following command:

```
pip install -r requirements.txt
```
Create a PostgreSQL database and update the DATABASES setting in `jobonja_backend/settings.py` file with your database details.

Run database migrations using the following command:

```
python manage.py migrate
```
Create a superuser account using the following command:

```
python manage.py createsuperuser
```
## Usage
Run the Django server using the following command:

```
python manage.py runserver
```
Open a web browser and navigate to `http://127.0.0.1:8000/admin` to access the Django admin panel.

To access the Jobonja website API endpoints, use a REST client like Postman.

## Authentication
The Jobonja website uses JWT for authentication. To authenticate a user, send a POST request to `/api/token/` with the user's username and password in the request body. The server will respond with an access token. Use the access token to access the protected API endpoints.

## API Endpoints
The Jobonja website API endpoints are as follows:

- /api/register/: Register a new user.
- /api/token/: Obtain an access token.
- /api/jobs/: List all jobs or create a new job.
- /api/jobs/{job_id}/: Retrieve, update or delete a job.
- ...
