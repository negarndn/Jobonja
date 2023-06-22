import os

from django.http import FileResponse
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password

from .repositories.user_repository import UserRepository
from .serializers import SignUpSerializer, UserSerializer
from .validators import validate_file_extension

from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.conf import settings
from .services.user_service import UserService
import logging


logger = logging.getLogger(__name__)

# Create your views here.

user_service = UserService()

@api_view(['POST'])
def register(request):
    data = request.data

    try:
        created_user = user_service.register_user(data)
        return Response({
            'message': 'User registered.',
            'user': created_user
        }, status=status.HTTP_200_OK)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):
    user = request.user
    current_user = user_service.get_current_user(user)
    return Response(current_user)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    data = request.data

    try:
        updated_user = user_service.update_user(user, data)
        return Response(updated_user)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def uploadResume(request):
    user = request.user
    try:
        resume = request.FILES['resume']
    except MultiValueDictKeyError:
        logger.error('empty resume source')
        return Response({'error': 'Please upload your resume.'}, status=status.HTTP_400_BAD_REQUEST)

    result, success = user_service.upload_resume(user, resume)

    if success:
        logger.info('Resume was uploaded for user: %s', user.username)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    else:
        logger.error('Error occurred while uploading resume: %s', result['error'])
        return Response(result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def downloadResume(request):
    user = request.user

    result = user_service.download_resume(user)
    return result





