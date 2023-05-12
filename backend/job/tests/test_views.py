from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from job.models import Job
from account.models import UserProfile
from django.contrib.auth.models import User




class JobTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('jobs')
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.job1 = {
            'title': 'Job 1',
            'description': 'Job Description 1',
            'jobType': 'Permanent',
            'education': 'Bachelors',
            'industry': 'Business',
            'experience': 'One_Year',
            'salary': 50000,
            'positions': 1}
        # self.job2 = Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
        #                                education='Masters', industry='IT', experience='Two_Years',
        #                                salary=70000, positions=2)
        # self.job3 = Job.objects.create(title='Job 3', description='Job Description 3', jobType='Internship',
        #                                education='Phd', industry='Telecommunication', experience='Three_Years_Above',
        #                                salary=90000, positions=3)

        self.valid_job = {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@test.com',
            'address': '123 Test Street',
            'jobType': 'Permanent',
            'education': 'phd',
            'industry': 'Telecommunication',
            'experience': 'Three_Years_Above',
            'salary': 50000,
            'positions': 1,
            'company': 'Test Company',
            'lastDate': '2022-01-01T00:00:00Z',
            'user': '1'
        }

        self.invalid_job = {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@test.com',
            'address': '123 Test Street',
            'jobType': 'Invalid Job Type',
            'education': 'Invalid Education',
            'industry': 'Invalid Industry',
            'experience': 'Invalid Experience',
            'salary': 'Invalid Salary',
            'positions': 'Invalid Positions',
            'company': 'Test Company',
            'lastDate': '2022-01-01T00:00:00Z',
            'user': '1'
        }

    def test_get_all_jobs_successfully(self):
        Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                           education='Masters', industry='IT', experience='Two_Years',
                           salary=70000, positions=2)
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(len(response.data['jobs']), 1)

    def test_get_all_jobs_with_pagination(self):
        Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                           education='Masters', industry='IT', experience='Two_Years',
                           salary=70000, positions=2)
        response = self.client.get(self.url + '?page=1', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(len(response.data['jobs']), 1)
        self.assertEqual(response.data['resPerPage'], 10)

    def test_get_all_jobs_with_filtering(self):
        Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                           education='Masters', industry='IT', experience='Two_Years',
                           salary=70000, positions=2)
        response = self.client.get(self.url + '?industry=IT', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(len(response.data['jobs']), 1)
        self.assertEqual(response.data['jobs'][0]['industry'], 'IT')

    def test_create_valid_job_without_authentication(self):
        response = self.client.post(reverse('new_job'), self.valid_job, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_invalid_job_without_authentication(self):
        response = self.client.post(reverse('new_job'), self.invalid_job, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_valid_job_with_authentication(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('new_job'), self.valid_job, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Job.objects.get().title, 'Test Job')

    # def test_create_invalid_job_with_authentication(self):
    #     self.client.force_authenticate(user=self.user)
    #     response = self.client.post(reverse('new_job'), self.invalid_job, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    #     self.assertEqual(Job.objects.count(), 0)

    def test_new_job_with_invalid_data(self):
        # Test with missing required fields
        response = self.client.post(self.url, {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@example.com'
        })
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Job.objects.count(), 0)

        # Test with invalid data types
        response = self.client.post(self.url, {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@example.com',
            'jobType': 'invalid',  # Invalid job type
            'education': 'invalid',  # Invalid education type
            'industry': 'invalid',  # Invalid industry type
            'experience': 'invalid',  # Invalid experience type
            'salary': 'invalid',  # Invalid salary value
            'positions': 'invalid',  # Invalid positions value
            'company': 123,  # Invalid company value
        })
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Job.objects.count(), 0)

        # Test with out-of-range salary value
        response = self.client.post(self.url, {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@example.com',
            'salary': 1000000000,  # Out of range salary value
        })
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Job.objects.count(), 0)
