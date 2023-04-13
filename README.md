# Jobonja Backend
This is a job portal website developed using Django Rest Framework, JWT, and PostgreSQL.
It allows users to create profiles and search for job listings, while they can also post job listings and search for job seekers.
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

Run the Django server using the following command:

```
python manage.py runserver
```
Open a web browser and navigate to `http://127.0.0.1:8000/admin` to access the Django admin panel.

To access the Jobonja website API endpoints, use a REST client like Postman.


## API Documentation

The website also includes a RESTful API that can be used to create, read, update, and delete job listings and user profiles. The API documentation can be found in the `api/` directory of this repository.

## Usage

### Authentication

To use the website, users must first create an account. They can do so by clicking the "Register" link in the homepage and filling out the registration form to create a new account.

### Job Application Ad

Users can create job listings by logging in and clicking the "Post a Job" button. They will need to provide information about the job, such as the title, description, and location. Job seekers can search for job listings by entering keywords into the search bar on the homepage. They can also filter job listings.

## Contributing
If you would like to contribute to the backend of Jobonja, please fork the repository and submit a pull request with your changes. Before submitting a pull request, please make sure that your changes are well-tested and follow the project's coding standards.


