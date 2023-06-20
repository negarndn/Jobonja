import logging
import os
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import FileResponse
from ..validators import validate_file_extension
from django.core.exceptions import ValidationError

logger = logging.getLogger(__name__)


class UserRepository:
    def create_user(self, data):
        user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        user.save()
        logger.info('User created: %s', user.username)
        return user

    def get_user_by_email(self, email):
        user = User.objects.filter(username=email).first()
        if user:
            logger.info('User found: %s', user.username)
        else:
            logger.warning('User not found for email: %s', email)
        return user

    def update_user(self, user, data):
        if data['first_name']:
            user.first_name = data['first_name']
        if data['last_name']:
            user.last_name = data['last_name']
        if data['email']:
            user.username = data['email']
            user.email = data['email']
        if data['password']:
            password = make_password(data['password'])
            if password:
                user.password = make_password(password)
            else:
                print(password)
                raise ValidationError('Please enter your password.')
        user.save()
        logger.info('User updated: %s', user.username)
        return user

    def upload_resume(self, user, resume):
        try:
            isValidFile = validate_file_extension(resume.name)
            if not isValidFile:
                logger.error('wrong resume format')
                return {'error': 'Please upload only PDF files.'}, False

            # Delete the previous resume if a new one is uploaded
            if user.userprofile.resume:
                if os.path.isfile(user.userprofile.resume.path):
                    os.remove(user.userprofile.resume.path)

            user.userprofile.resume = resume
            user.userprofile.save()
            logger.info('Resume was uploaded for user: %s', user.username)

            return {'success': 'Resume uploaded successfully.'}, True

        except Exception as e:
            logger.error('Error occurred while uploading resume: %s', str(e))
            return {'error': 'An error occurred while uploading the resume.'}, False

    def download_resume(self, user):
        resume = user.userprofile.resume
        if resume:
            filename = resume.path
            response = FileResponse(open(filename, 'rb'))
            return response
        else:
            logger.error('Resume not found for user: %s', user.username)
            return {'error': 'Resume not found.'}, False