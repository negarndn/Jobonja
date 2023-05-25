from django.urls import reverse, resolve
from django.test import TestCase

from job import views


class TestJobUrls(TestCase):
    def test_get_all_jobs_url(self):
        url = reverse('jobs')
        self.assertEqual(resolve(url).func, views.getAllJobs)

    def test_get_job_url(self):
        url = reverse('job', args=['1'])
        self.assertEqual(resolve(url).func, views.getJob)

    def test_new_job_url(self):
        url = reverse('new_job')
        self.assertEqual(resolve(url).func, views.newJob)

    def test_update_job_url(self):
        url = reverse('update_job', args=['1'])
        self.assertEqual(resolve(url).func, views.updateJob)

    def test_delete_job_url(self):
        url = reverse('delete_job', args=['1'])
        self.assertEqual(resolve(url).func, views.deleteJob)

    def test_apply_to_job_url(self):
        url = reverse('apply_to_job', args=['1'])
        self.assertEqual(resolve(url).func, views.applyToJob)

    def test_get_current_user_applied_jobs_url(self):
        url = reverse('current_user_applied_jobs')
        self.assertEqual(resolve(url).func, views.getCurrentUserAppliedJobs)

    def test_is_applied_to_job_url(self):
        url = reverse('is_applied_to_job', args=['1'])
        self.assertEqual(resolve(url).func, views.isApplied)

    def test_get_current_user_jobs_url(self):
        url = reverse('current_user_jobs')
        self.assertEqual(resolve(url).func, views.getCurrentUserJobs)

    def test_get_candidates_applied_url(self):
        url = reverse('get_candidates_applied', args=['1'])
        self.assertEqual(resolve(url).func, views.getCandidatesApplied)
