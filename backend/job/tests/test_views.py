from datetime import datetime, timedelta
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.test import APITestCase
from job.models import Job, CandidatesApplied
from django.contrib.auth.models import User
from job.serializers import CandidatesAppliedSerializer


class JobTestCase(APITestCase):


    def test_get_all_jobs_should_OK_when_there_is_no_pagination(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        job_test_2 = Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                                        education='Masters', industry='Telecommunication', experience='Two_Years',
                                        salary=70000, positions=2, user=user)

        #act
        response = client.get(reverse('jobs'), format='json')

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(len(response.data['jobs']), 2)

    def test_get_all_jobs_should_OK_when_there_no_pagination(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        job_test_2 = Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                                        education='Masters', industry='Telecommunication', experience='Two_Years',
                                        salary=70000, positions=2, user=user)

        #act
        response = client.get(reverse('jobs') + '?page=1', format='json')

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(len(response.data['jobs']), 2)
        self.assertEqual(response.data['resPerPage'], 10)

    def test_get_all_jobs_should_OK_when_there_is_filtering(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        #act
        response = client.get(reverse('jobs') + '?industry=IT', format='json')

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(len(response.data['jobs']), 1)
        self.assertEqual(response.data['jobs'][0]['industry'], 'IT')

    def test_new_job_should_UNAUTHORIZED_when_inputs_are_valid_data_without_authentication(self):
        #arrange
        client = APIClient()
        valid_job = {
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
        #act
        response = client.post(reverse('new_job'), valid_job, format='json')

        #assert
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_new_job_should_UNAUTHORIZED_when_inputs_are_invalid_data_without_authentication(self):
        #arrange
        client = APIClient()
        invalid_job = {
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
        #act
        response = client.post(reverse('new_job'), invalid_job, format='json')

        #assert
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_new_job_should_OK_when_inputs_are_valid_data_with_authentication(self):
        #aarange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        valid_job = {
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
        client.force_authenticate(user=user)

        #act
        response = client.post(reverse('new_job'), valid_job, format='json')

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_job_should_OK_when_user_is_authenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

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

        client.force_authenticate(user=user)

        #act
        response = client.put(reverse('update_job', args=[job_test_1.id]), data)

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'New Test Job')
        self.assertEqual(response.data['description'], 'New Test Job Description')
        self.assertEqual(response.data['email'], 'newtestjob@test.com')
        self.assertEqual(response.data['address'], 'New Test Address')
        self.assertEqual(response.data['jobType'], 'Permanent')
        self.assertEqual(response.data['education'], 'Bachelors')
        self.assertEqual(response.data['industry'], 'Business')
        self.assertEqual(response.data['experience'], 'No_Experience')
        self.assertEqual(response.data['salary'], 60000)
        self.assertEqual(response.data['positions'], 10)
        self.assertEqual(response.data['company'], 'New Test Company')

    def test_update_job_should_UNAUTHORIZED_when_user_is_unauthenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

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

        #act
        response = client.put(reverse('update_job', args=[job_test_1.id]), data)

        #assert
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_job_should_OK_when_user_is_authenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        client.force_authenticate(user=user)

        #act
        response = client.delete(reverse('delete_job', args=[job_test_1.id]))

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Job.objects.filter(id=job_test_1.id).exists())

    def test_delete_job_should_UNAUTHORIZED_when_user_is_unauthenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        #act
        response = client.delete(reverse('delete_job', args=[job_test_1.id]))

        #assert
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertTrue(Job.objects.filter(id=job_test_1.id).exists())

    def test_delete_job_should_FORBIDDEN_when_user_is_wrong(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        client.force_authenticate(user=user2)

        #act
        response = client.delete(reverse('delete_job', args=[job_test_1.id]))

        #assert
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertTrue(Job.objects.filter(id=job_test_1.id).exists())

    def test_delete_job_should_NOT_FOUND_when_job_id_is_invalid(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        client.force_authenticate(user=user)

        #act
        response = client.delete(reverse('delete_job', args=[0]))

        #assert
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Job.objects.filter(id=job_test_1.id).exists())

    def test_get_candidates_applied_should_OK_when_user_is_authenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        candidate_1 = CandidatesApplied.objects.create(
            job=job_test_1,
            user=user,
            resume='Candidate 1 Resume'
        )

        candidate_2 = CandidatesApplied.objects.create(
            job=job_test_1,
            user=user2,
            resume='Candidate 2 Resume'
        )

        client.force_authenticate(user=user)

        #act
        response = client.get(reverse('get_candidates_applied', kwargs={'pk': job_test_1.id}))

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_data = CandidatesAppliedSerializer(
            [candidate_1, candidate_2], many=True).data
        self.assertEqual(response.data, expected_data)

    def test_get_candidates_applied_should_UNAUTHORIZED_when_user_is_unauthenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        candidate_1 = CandidatesApplied.objects.create(
            job=job_test_1,
            user=user,
            resume='Candidate 1 Resume'
        )

        #act
        response = client.get(reverse('get_candidates_applied', kwargs={'pk': job_test_1.id}))

        #assert
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_candidates_applied_should_FORBIDDEN_when_user_is_wrong(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        candidate_1 = CandidatesApplied.objects.create(
            job=job_test_1,
            user=user,
            resume='Candidate 1 Resume'
        )

        client.force_authenticate(user=user2)

        #act
        response = client.get(reverse('get_candidates_applied', kwargs={'pk': job_test_1.id}))

        #assert
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_apply_to_job_should_OK_when_there_is_resume_and_authentication(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        user2.userprofile.resume = 'path/to/resume.pdf'
        user2.userprofile.save()
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        client.force_authenticate(user=user2)

        #act
        response = client.post(reverse('apply_to_job', args=[job_test_1.id]))

        #assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['applied'])
        self.assertIn('job_id', response.data)

    def test_apply_to_job_should_BAD_REQUEST_there_is_authentication_and_no_resume(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        user2.userprofile.resume = ''
        user2.userprofile.save()
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        client.force_authenticate(user=user2)

        #act
        response = client.post(reverse('apply_to_job', kwargs={'pk': job_test_1.id}))

        #assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Please upload your resume first')

    def test_apply_to_job_should_BAD_REQUEST_when_job_expired(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        user2.userprofile.resume = 'path/to/resume.pdf'
        user2.userprofile.save()
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        job_test_1.lastDate = timezone.now() - timedelta(days=1)
        job_test_1.save()

        client.force_authenticate(user=user2)

        #act
        response = client.post(reverse('apply_to_job', kwargs={'pk': job_test_1.id}))

        #assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'You can not apply to this job. Date is over')

    def test_apply_to_same_job_twice_should_BAD_REQUEST(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        user2.userprofile.resume = 'path/to/resume.pdf'
        user2.userprofile.save()
        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)

        client.force_authenticate(user=user2)

        #act (first apply)
        response = client.post(reverse('apply_to_job', args=[job_test_1.id]))

        #assert (first apply)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['applied'], True)

        #act (second apply)
        response = client.post(reverse('apply_to_job', args=[job_test_1.id]))

        #assert (second apply)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'You have already apply to this job.')

    def test_get_current_user_applied_jobs_should_OK_when_user_is_authenticated(self):
        #arrange
        client = APIClient()
        user = User.objects.create_user(username='testuser', password='testpass')
        user2 = User.objects.create_user(username='testuser2', password='testpass2')
        user2.userprofile.resume = 'path/to/resume.pdf'
        user2.userprofile.save()
        user3 = User.objects.create_user(username='testuser3', password='testpass3')

        job_test_1 = Job.objects.create(title='Job 1', description='Job Description 1', jobType='Permanent',
                                        education='Masters', industry='IT', experience='Two_Years',
                                        salary=80000, positions=1, user=user)
        job_test_2 = Job.objects.create(title='Job 2', description='Job Description 2', jobType='Temporary',
                                        education='Masters', industry='Telecommunication', experience='Two_Years',
                                        salary=70000, positions=2, user=user3)

        client.force_authenticate(user=user2)


        # act
        client.post(reverse('apply_to_job', args=[job_test_1.id]))
        client.post(reverse('apply_to_job', args=[job_test_2.id]))
        response = client.get(reverse('current_user_applied_jobs'))

        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)


