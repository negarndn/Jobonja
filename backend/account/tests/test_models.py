from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth.models import User
from ..models import UserProfile


class UserProfileModelTestCase(TestCase):
    def setUp(self):
        # arrange
        self.resume = SimpleUploadedFile("file.pdf", b"file_content", content_type="application/pdf")
        # act
        self.user = User.objects.create(username='testuser', password='testpass')

    def test_create_user_profile(self):
        # Assert that UserProfile is created automatically when User is created
        self.assertIsNotNone(self.user.userprofile)
        self.assertIsInstance(self.user.userprofile, UserProfile)

    def test_upload_resume(self):
        # Upload resume to UserProfile and assert that it's saved correctly
        self.user.userprofile.resume = self.resume
        self.user.userprofile.save()
        user_profile = UserProfile.objects.get(user=self.user)

        self.assertIsNotNone(user_profile.resume)
        self.assertEqual(user_profile.resume.name, "file.pdf")
