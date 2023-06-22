from ..repositories.job_repository import JobRepository, CandidatesAppliedRepository


class JobService:
    def __init__(self):
        self.job_repository = JobRepository()

    def get_all_jobs(self):
        return self.job_repository.get_all_jobs()

    def get_job_by_id(self, job_id):
        return self.job_repository.get_job_by_id(job_id)

    def get_jobs_by_user(self, user):
        return self.job_repository.get_jobs_by_user(user)

    def create_job(self, data):
        return self.job_repository.create_job(data)

    def update_job(self, job, data):
        self.job_repository.update_job(job, data)

    def delete_job(self, job):
        self.job_repository.delete_job(job)



class CandidatesAppliedService:
    def __init__(self):
        self.candidates_applied_repository = CandidatesAppliedRepository()

    def get_candidates_applied(self, job):
        return self.candidates_applied_repository.get_candidates_applied(job)

    def create_candidate_applied(self, job, user, resume):
        return self.candidates_applied_repository.create_candidate_applied(job, user, resume)

    def get_candidate_applied(self, job, user):
        return self.candidates_applied_repository.get_candidate_applied(job, user)

    def is_job_applied(self, job, user):
        return self.candidates_applied_repository.is_job_applied(job, user)

    def get_applied_jobs_by_user(self, user):
        return self.candidates_applied_repository.get_applied_jobs_by_user(user)

