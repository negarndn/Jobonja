from ..models import Job, CandidatesApplied


class JobRepository:
    def get_all_jobs(self):
        return Job.objects.all().order_by('id')

    def get_job_by_id(self, job_id):
        return Job.objects.get(id=job_id)

    def get_jobs_by_user(self, user):
        return Job.objects.filter(user=user)

    def create_job(self, data):
        return Job.objects.create(**data)

    def update_job(self, job, data):
        if 'title' in data:
            job.title = data['title']
        if 'description' in data:
            job.description = data['description']
        if 'email' in data:
            job.email = data['email']
        if 'address' in data:
            job.address = data['address']
        if 'jobType' in data:
            job.jobType = data['jobType']
        if 'education' in data:
            job.education = data['education']
        if 'industry' in data:
            job.industry = data['industry']
        if 'experience' in data:
            job.experience = data['experience']
        if 'salary' in data:
            job.salary = data['salary']
        if 'positions' in data:
            job.positions = data['positions']
        if 'company' in data:
            job.company = data['company']
        job.save()

    def delete_job(self, job):
        job.delete()


class CandidatesAppliedRepository:
    def get_candidates_applied(self, job):
        return job.candidatesapplied_set.all()

    def create_candidate_applied(self, job, user, resume):
        return CandidatesApplied.objects.create(job=job, user=user, resume=resume)

    def get_candidate_applied(self, job, user):
        return job.candidatesapplied_set.filter(user=user).exists()

    def is_job_applied(self, job, user):
        return CandidatesApplied.objects.filter(job=job, user=user).exists()

    def get_applied_jobs_by_user(self, user):
        return CandidatesApplied.objects.filter(user=user)
