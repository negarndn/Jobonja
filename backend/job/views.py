import logging
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from .filters import JobsFilter
from .models import Job
from .serializers import JobSerializer, CandidatesAppliedSerializer
from .services.job_service import JobService, CandidatesAppliedService

logger = logging.getLogger(__name__)

@api_view(['GET'])
def getAllJobs(request):
    try:
        job_service = JobService()
        jobs = job_service.get_all_jobs()

        filterset = JobsFilter(request.GET, queryset=jobs)
        count = filterset.qs.count()

        # Pagination
        resPerPage = 10
        paginator = PageNumberPagination()
        paginator.page_size = resPerPage
        queryset = paginator.paginate_queryset(filterset.qs, request)

        serializer = JobSerializer(queryset, many=True)
        return Response({
            "count": count,
            "resPerPage": resPerPage,
            "jobs": serializer.data
        })
    except Exception as e:
        logger.exception("Error occurred while retrieving all jobs: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getJob(request, pk):
    try:
        job_service = JobService()
        job = job_service.get_job_by_id(pk)

        candidates_applied_service = CandidatesAppliedService()
        candidates = candidates_applied_service.get_candidates_applied(job)

        serializer = JobSerializer(job, many=False)

        return Response({'job': serializer.data, 'candidates': candidates})
    except Job.DoesNotExist:
        logger.warning("Job with id %s does not exist", pk)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("Error occurred while retrieving job details: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newJob(request):
    try:
        request.data['user'] = request.user
        data = request.data

        job_service = JobService()
        job = job_service.create_job(data)

        serializer = JobSerializer(job, many=False)

        logger.info("New job was added")

        return Response(serializer.data)
    except Exception as e:
        logger.exception("Error occurred while creating a new job: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    try:
        job_service = JobService()
        job = job_service.get_job_by_id(pk)

        if job.user != request.user:
            logger.warning('Wrong user tried to update job with id %s', pk)
            return Response({'message': 'You cannot update this job'}, status=status.HTTP_403_FORBIDDEN)

        job_service.update_job(job, request.query_params)


        serializer = JobSerializer(job, many=False)

        logger.info("Job was updated")

        return Response(serializer.data)
    except Job.DoesNotExist:
        logger.warning("Job with id %s does not exist", pk)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("Error occurred while updating the job: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    try:
        job_service = JobService()
        job = job_service.get_job_by_id(pk)

        if job.user != request.user:
            logger.warning('Wrong user tried to delete job with id %s', pk)
            return Response({'message': 'You cannot delete this job'}, status=status.HTTP_403_FORBIDDEN)

        job_service.delete_job(job)

        logger.info("Job was deleted")

        return Response({'message': 'Job is deleted'}, status=status.HTTP_200_OK)
    except Job.DoesNotExist:
        logger.warning("Job with id %s does not exist", pk)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("Error occurred while deleting the job: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyToJob(request, pk):
    try:
        user = request.user

        job_service = JobService()
        job = job_service.get_job_by_id(pk)

        candidates_applied_service = CandidatesAppliedService()
        already_applied = candidates_applied_service.get_candidate_applied(job, user)

        if user.userprofile.resume == '':
            logger.warning('User tried to apply to job without uploading a resume')
            return Response({'error': 'Please upload your resume first'}, status=status.HTTP_400_BAD_REQUEST)

        if job.lastDate < timezone.now():
            logger.warning('User tried to apply to an expired job')
            return Response({'error': 'You cannot apply to this job. The deadline has passed'},
                            status=status.HTTP_400_BAD_REQUEST)

        if already_applied:
            logger.warning('User tried to apply to a job they have already applied to')
            return Response({'error': 'You have already applied to this job.'}, status=status.HTTP_400_BAD_REQUEST)

        candidates_applied_service.create_candidate_applied(job, user, user.userprofile.resume)

        logger.info('Successfully applied to the job')

        return Response({
            'applied': True,
            'job_id': job.id
        }, status=status.HTTP_200_OK)
    except Job.DoesNotExist:
        logger.warning("Job with id %s does not exist", pk)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("Error occurred while applying to the job: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUserAppliedJobs(request):
    try:
        user = request.user

        candidates_applied_service = CandidatesAppliedService()
        jobs = candidates_applied_service.get_applied_jobs_by_user(user)

        serializer = CandidatesAppliedSerializer(jobs, many=True)

        logger.info("Retrieved current user's applied jobs")
        return Response(serializer.data)
    except Exception as e:
        logger.exception("Error occurred while retrieving current user's applied jobs: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def isApplied(request, pk):
    try:
        user = request.user

        job_service = JobService()
        job = job_service.get_job_by_id(pk)

        candidates_applied_service = CandidatesAppliedService()
        applied = candidates_applied_service.is_job_applied(job, user)

        return Response(applied)
    except Job.DoesNotExist:
        logger.warning("Job with id %s does not exist", pk)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("Error occurred while checking if the job is applied: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUserJobs(request):
    try:
        user = request.user

        job_service = JobService()
        jobs = job_service.get_jobs_by_user(user)

        serializer = JobSerializer(jobs, many=True)

        logger.info("Retrieved current user's jobs")
        return Response(serializer.data)
    except Exception as e:
        logger.exception("Error occurred while retrieving current user's jobs: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidatesApplied(request, pk):
    try:
        user = request.user

        job_service = JobService()
        job = job_service.get_job_by_id(pk)

        if job.user != user:
            logger.warning('Wrong user tried to access candidates for job with id %s', pk)
            return Response({'error': 'You cannot access this job'}, status=status.HTTP_403_FORBIDDEN)

        candidates_applied_service = CandidatesAppliedService()
        candidates = candidates_applied_service.get_candidates_applied(job)

        serializer = CandidatesAppliedSerializer(candidates, many=True)

        return Response(serializer.data)
    except Job.DoesNotExist:
        logger.warning("Job with id %s does not exist", pk)
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.exception("Error occurred while retrieving candidates applied for the job: %s", str(e))
        return Response({"error": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

