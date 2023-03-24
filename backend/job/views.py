from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Job
from .serializers import JobSerializer
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def getAllJobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)