from django.test import TestCase
from django.core.exceptions import ValidationError
from job.models import Job
from datetime import datetime, timedelta


class JobModelTest(TestCase):

    def test_job_creation(self):
        # Test creating a job with all valid inputs
        job = Job.objects.create(
            title='Software Engineer',
            description='Job description',
            email='test@example.com',
            address='123 Main St',
            jobType='Permanent',
            education='Masters',
            industry='IT',
            experience='Two_Years',
            salary=50000,
            positions=2,
            company='Example Inc',
            lastDate=datetime.now() + timedelta(days=30),
            user=None
        )

        self.assertEqual(job.title, 'Software Engineer')
        self.assertEqual(job.description, 'Job description')
        self.assertEqual(job.email, 'test@example.com')
        self.assertEqual(job.address, '123 Main St')
        self.assertEqual(job.jobType, 'Permanent')
        self.assertEqual(job.education, 'Masters')
        self.assertEqual(job.industry, 'IT')
        self.assertEqual(job.experience, 'Two_Years')
        self.assertEqual(job.salary, 50000)
        self.assertEqual(job.positions, 2)
        self.assertEqual(job.company, 'Example Inc')


        # Test creating a job with invalid job type
        with self.assertRaises(ValidationError):
            job = Job.objects.create(
                title='Software Engineer',
                description='Job description',
                email='test@example.com',
                address='123 Main St',
                jobType='Invalid Job Type',
                education='Masters',
                industry='IT',
                experience='Two_Years',
                salary=50000,
                positions=2,
                company='Example Inc',
                lastDate=datetime.now() + timedelta(days=30),
                user=None
            )

        # Test creating a job with invalid education level
        with self.assertRaises(ValidationError):
            job = Job.objects.create(
                title='Software Engineer',
                description='Job description',
                email='test@example.com',
                address='123 Main St',
                jobType='Permanent',
                education='Invalid Education Level',
                industry='IT',
                experience='Two_Years',
                salary=50000,
                positions=2,
                company='Example Inc',
                lastDate=datetime.now() + timedelta(days=30),
                user=None
            )

        # Test creating a job with invalid industry
        with self.assertRaises(ValidationError):
            job = Job.objects.create(
                title='Software Engineer',
                description='Job description',
                email='test@example.com',
                address='123 Main St',
                jobType='Permanent',
                education='Masters',
                industry='invalid industry',
                experience='Two_Years',
                salary=50000,
                positions=2,
                company='Example Inc',
                lastDate=datetime.now() + timedelta(days=30),
                user=None
            )

        # Test creating a job with invalid experience
        with self.assertRaises(ValidationError):
            job = Job.objects.create(
                title='Software Engineer',
                description='Job description',
                email='test@example.com',
                address='123 Main St',
                jobType='Permanent',
                education='Masters',
                industry='IT',
                experience='invalid experience',
                salary=50000,
                positions=2,
                company='Example Inc',
                lastDate=datetime.now() + timedelta(days=30),
                user=None
            )

        # Test creating a job with invalid salary
        with self.assertRaises(ValidationError):
            job = Job.objects.create(
                title='Software Engineer',
                description='Job description',
                email='test@example.com',
                address='123 Main St',
                jobType='Permanent',
                education='Masters',
                industry='IT',
                experience='Two_Years',
                salary=1000000000,
                positions=2,
                company='Example Inc',
                lastDate=datetime.now() + timedelta(days=30),
                user=None
            )
