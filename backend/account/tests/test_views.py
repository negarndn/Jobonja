from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile


class RegistrationTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration_success(self):
        # arrange
        url = reverse('register')
        data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }
        # act
        response = self.client.post(url, data, format='json')
        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().email, 'testuser@example.com')

    def test_registration_empty_field(self):
        # arrange
        url = reverse('register')
        data = {
            'first_name': 'Test',
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }
        # act
        response = self.client.post(url, data, format='json')
        # assert

        self.assertEqual(User.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_registration_existing_user(self):
        # arrange
        User.objects.create(
            first_name='Test',
            last_name='User',
            username='testuser@example.com',
            email='testuser@example.com',
            password='testpassword'
        )
        url = reverse('register')
        data = {
            'first_name': 'Test',
            'last_name': 'User',
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }
        # act
        response = self.client.post(url, data, format='json')
        # assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'User already exists')


class UserProfileTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser@example.com',
            email='testuser@example.com',
            password='testpassword'
        )
        self.client.force_authenticate(user=self.user)

    def test_current_user(self):
        # arrange
        url = reverse('current_user')
        # act
        response = self.client.get(url)
        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'testuser@example.com')

    def test_update_user(self):
        # arrange
        url = reverse('update_user')
        data = {
            'first_name': 'Updated',
            'last_name': 'User',
            'email': 'updateduser@example.com',
            'password': 'updatedpassword'
        }
        # act
        response = self.client.put(url, data, format='json')
        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'updateduser@example.com')

    def test_update_user_empty_password(self):
        # arrange
        url = reverse('update_user')
        data = {
            'first_name': 'Updated',
            'last_name': 'User',
            'email': 'updateduser@example.com',
            'password': ''
        }
        # act
        response = self.client.put(url, data, format='json')
        # assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Please enter your password.')


    def test_download_resume(self):
        # arrange
        self.user.userprofile.resume = 'test_resume.pdf'
        self.user.userprofile.save()
        url = reverse('download_resume')
        # act
        response = self.client.get(url)
        # assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.get('Content-Disposition'), 'inline; filename="test_resume.pdf"')




class UploadResumeViewTestCase(TestCase):
    def setUp(self):
        # arrange
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser@example.com',
            email='testuser@example.com',
            password='testpassword'
        )
        self.url = reverse('upload_resume')
        self.pdf_file = SimpleUploadedFile('test_resume.pdf', b'Test content', content_type='application/pdf')
        self.client.force_authenticate(user=self.user)




    def test_upload_resume_success(self):
        # act
        response = self.client.put(self.url, {'resume': self.pdf_file})
        # assert
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], self.user.email)
        self.assertIsNotNone(self.user.userprofile.resume)


    def test_upload_resume_no_file(self):
        # act
        response = self.client.put(self.url, {})
        # assert
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Please upload your resume.')

    def test_upload_resume_invalid_file_type(self):
        # arrange
        text_file = SimpleUploadedFile('test_resume.txt', b'Test content', content_type='text/plain')
        # act
        response = self.client.put(self.url, {'resume': text_file})
        # assert
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Please upload only pdf file.')


