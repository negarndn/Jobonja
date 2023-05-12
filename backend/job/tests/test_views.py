from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from job.models import Job, CandidatesApplied
from account.models import UserProfile
from django.contrib.auth.models import User
from job.serializers import CandidatesAppliedSerializer


class JobTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('jobs')
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        # print("&&&&&")
        # print(self.user)
        # print("&&&&&")

        self.job_test_1 = Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                                             education='Masters', industry='IT', experience='Two_Years',
                                             salary=70000, positions=2)
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

        self.candidate_1 = CandidatesApplied.objects.create(
            job=self.job_test_1,
            user=self.user,
            resume='Candidate 1 Resume'
        )

        self.candidate_2 = CandidatesApplied.objects.create(
            job=self.job_test_1,
            user=self.user,
            resume='Candidate 2 Resume'
        )

    def test_get_all_jobs_successfully(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(len(response.data['jobs']), 1)

    def test_get_all_jobs_with_pagination(self):
        response = self.client.get(self.url + '?page=1', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(len(response.data['jobs']), 1)
        self.assertEqual(response.data['resPerPage'], 10)

    def test_get_all_jobs_with_filtering(self):
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

    def test_create_invalid_job_with_authentication(self):
        # Test with missing required fields
        response = self.client.post(self.url, {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@example.com'
        })
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Job.objects.count(), 1)

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
        self.assertEqual(Job.objects.count(), 1)

        # Test with out-of-range salary value
        response = self.client.post(self.url, {
            'title': 'Test Job',
            'description': 'This is a test job',
            'email': 'test@example.com',
            'salary': 1000000000,  # Out of range salary value
        })
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
        self.assertEqual(Job.objects.count(), 1)

    # def test_update_job_valid(self):
    #     # print("##########")
    #     self.client.login(username='testuser', password='testpass')
    #     # print("**********")
    #     # print(s)
    #     # print("**********")
    #     data = {
    #         'title': 'New Test Job',
    #         'description': 'New Test Job Description',
    #         'email': 'newtestjob@test.com',
    #         'address': 'New Test Address',
    #         'jobType': 'Permanent',
    #         'education': 'Bachelors',
    #         'industry': 'Business',
    #         'experience': 'No_Experience',
    #         'salary': 60000,
    #         'positions': 10,
    #         'company': 'New Test Company',
    #     }
    #     #print(self.job_test_1.id)
    #     response = self.client.put(reverse('update_job', args=[self.job_test_1.id]), data)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertEqual(response.data['title'], 'New Test Job')
    #     self.assertEqual(response.data['description'], 'New Test Job Description')
    #     self.assertEqual(response.data['email'], 'newtestjob@test.com')
    #     self.assertEqual(response.data['address'], 'New Test Address')
    #     self.assertEqual(response.data['jobType'], 'Permanent')
    #     self.assertEqual(response.data['education'], 'Bachelors')
    #     self.assertEqual(response.data['industry'], 'Business')
    #     self.assertEqual(response.data['experience'], 'No_Experience')
    #     self.assertEqual(response.data['salary'], 60000)
    #     self.assertEqual(response.data['positions'], 10)
    #     self.assertEqual(response.data['company'], 'New Test Company')

    def test_update_job_unauthenticated(self):
        data = {
            'title': 'New Test Job',
            'description': 'New Test Job Description',
            'email': 'newtestjob@test.com',
            'address': 'New Test Address',
            'jobType': 'Permanent',
            'education': 'Bachelors',
            'industry': 'Business',
            'experience': 'No_Experience',
            'salary': 60000,
            'positions': 10,
            'company': 'New Test Company',
        }
        response = self.client.put(reverse('update_job', args=[self.job_test_1.id]), data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # def test_delete_job(self):
    #     self.client.login(username='testuser', password='testpass')
    #     # print("##########")
    #     # print(s)
    #     # print("##########")
    #     response = self.client.delete(reverse('delete_job', args=[self.job_test_1.id]))
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertFalse(Job.objects.filter(id=self.job_test_1.id).exists())

    def test_delete_job_unauthenticated(self):
        response = self.client.delete(reverse('delete_job', args=[self.job_test_1.id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(Job.objects.filter(id=self.job_test_1.id).exists())

    def test_delete_job_wrong_user(self):
        user2 = User.objects.create_user(
            username='testuser2',
            email='testuser2@test.com',
            password='testpass2'
        )
        job_test_2 = Job.objects.create(
            title='Test Job 2',
            description='Test job description 2',
            email='test2@test.com',
            address='Test address 2',
            jobType='Permanent',
            education='Bachelors',
            industry='Business',
            experience='No Experience',
            salary=1000,
            positions=1,
            company='Test Company 2',
            user=user2
        )
        self.client.login(username='testuser', password='testpass')
        response = self.client.delete(reverse('delete_job', args=[job_test_2.id]))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(Job.objects.filter(id=job_test_2.id).exists())

    # def test_delete_job_invalid_id(self):
    #     self.client.login(username='testuser', password='testpass')
    #     response = self.client.delete(reverse('delete_job', args=[0]))
    #     self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    #     self.assertTrue(Job.objects.filter(id=self.job_test_1.id).exists())

    # def test_get_candidates_applied(self):
    #     self.client.login(username='testuser', password='testpass')
    #     url = reverse('get_candidates_applied', kwargs={'pk': self.job_test_1.id})
    #     response = self.client.get(url)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     expected_data = CandidatesAppliedSerializer(
    #         [self.candidate_1, self.candidate_2], many=True).data
    #     self.assertEqual(response.data, expected_data)

    def test_get_candidates_applied_unauthenticated(self):
        self.client.logout()
        url = reverse('get_candidates_applied', kwargs={'pk': self.job_test_1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_candidates_applied_forbidden(self):
        user_2 = User.objects.create_user(
            username='testuser2', password='testpass')
        job_2 = Job.objects.create(
            title='Test Job 2',
            description='Test Job Description 2',
            email='test2@test.com',
            address='Test Address 2',
            jobType='Permanent',
            education='Bachelors',
            industry='Business',
            experience='No_Experience',
            salary=10000,
            positions=1,
            company='Test Company 2',
            user=user_2
        )
        self.client.login(username='testuser', password='testpass')
        url = reverse('get_candidates_applied', kwargs={'pk': job_2.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

