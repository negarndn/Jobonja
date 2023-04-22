# Jobonja Frontend

This is the frontend side of Jobonja, a job portal website built using Next.js and Bootstrap. The frontend is responsible for rendering the user interface and handling user interactions for the Jobonja website.

## Getting Started

To get started with the frontend, you will need to have Node.js and npm installed on your machine. Once you have installed these dependencies, you can clone the repository and run the following command to install the required packages:

```
npm install
```

After the packages are installed, you can start the development server by running the following command:

```
npm run dev
```

This will start the development server on `http://localhost:3000`.

## Features

The frontend of Jobonja has the following features:

- User authentication: Users can sign up and log in to their accounts.
- Job search: Users can search for jobs based on keywords, and job type.
- Job listing: Users can view a list of jobs based on their search criteria.
- Job details: Users can view the details of a job, including the job description, requirements, and application instructions.
- Job application: Users can apply for a job by submitting their resume.
- User profile: Users can update their profile information, including their name, email, and password.
- Admin dashboard: Administrators can view a list of job applicants and manage job postings.

## Tech Stack

The frontend of Jobonja is built using the following technologies:

- Next.js: A React-based framework for building server-side rendered web applications.
- Bootstrap: A popular CSS framework for building responsive web interfaces.
- Axios: A library for making HTTP requests.

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

The website also includes a RESTful API that can be used to create, read, update, and delete job listings and user profiles. The API documentation can be found in the `API_Documetation.json` file of this repository.

## Usage

### Authentication

To use the website, users must first create an account. They can do so by clicking the "Register" link in the homepage and filling out the registration form to create a new account.

### Job Application Ad

Users can create job listings by logging in and clicking the "Post a Job" button. They will need to provide information about the job, such as the title, description, and location. Job seekers can search for job listings by entering keywords into the search bar on the homepage. They can also filter job listings.

## Contributing

If you would like to contribute to the frontend of Jobonja, please fork the repository and submit a pull request with your changes. Before submitting a pull request, please make sure that your changes are well-tested and follow the project's coding standards.
