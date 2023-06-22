import os

from django.http import FileResponse
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth.hashers import make_password
from .serializers import SignUpSerializer, UserSerializer
from .validators import validate_file_extension

from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User
from django.conf import settings

import logging
from .factories import UserFactory



logger = logging.getLogger(__name__)

# Create your views here.


@api_view(['POST'])
def register(request):
    data = request.data

    user = SignUpSerializer(data=data)

    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():

           user_factory = UserFactory()
           created_user = user_factory.create_user(data)

           logger.info('User registered')

           return Response({
                'message': 'User registered.'},
                status=status.HTTP_200_OK
            )
        else:
            logger.error('User already exists')
            return Response({
                'error': 'User already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

    else:
        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):

    user = UserSerializer(request.user)

    return Response(user.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):

    user = request.user
    data = request.data

    if data['first_name'] != '':
        user.first_name = data['first_name']
    if data['last_name'] != '':
        user.last_name = data['last_name']
    if data['email'] != '':
        user.username = data['email']
    if data['email'] != '':
        user.email = data['email']


    if data['password'] == '':
        return Response({'error': 'Please enter your password.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        user.password = make_password(data['password'])

    user.save()

    serializer = UserSerializer(user, many=False)
    logger.info('user was updated')
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def uploadResume(request):

    user = request.user
    try:
        resume = request.FILES['resume']
    except MultiValueDictKeyError as e:
        logger.error('empty resume source')
        return Response({'error': 'Please upload your resume.'}, status=status.HTTP_400_BAD_REQUEST)

    isValidFile = validate_file_extension(resume.name)

    if not isValidFile:
        logger.error('wrong resume format')
        return Response({ 'error': 'Please upload only pdf file.' }, status=status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user, many=False)

    user.userprofile.resume = resume
    user.userprofile.save()

    logger.info('resume was uploaded')

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def downloadResume(request):

    user = request.user
    resume = user.userprofile.resume
    filename = resume.path

    response = FileResponse(open(filename, 'rb'))
    return response


