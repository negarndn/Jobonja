from django.test import TestCase, Client
from django.urls import reverse, resolve
from rest_framework_simplejwt.views import TokenObtainPairView, TokenVerifyView

from account.views import register, currentUser, updateUser, uploadResume, downloadResume


class TestAccountUrls(TestCase):

    def test_register_url_resolves(self):
        url = reverse('register')
        self.assertEqual(resolve(url).func, register)


    def test_current_user_url_resolves(self):
        url = reverse('current_user')

        self.assertEqual(resolve(url).func, currentUser)

    def test_update_user_url_resolves(self):
        url = reverse('update_user')

        self.assertEqual(resolve(url).func, updateUser)

    def test_upload_resume_url_resolves(self):
        url = reverse('upload_resume')

        self.assertEqual(resolve(url).func, uploadResume)

    def test_download_resume_url_resolves(self):
        url = reverse('download_resume')
        # response = self.client.get(url)
        # self.assertEqual(response.status_code, 200)
        self.assertEqual(resolve(url).func, downloadResume)