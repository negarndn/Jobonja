from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

class UserFactory:
    @staticmethod
    def create_user(data):
        return User.objects.create(
            first_name=data['first_name'],
            last_name=data['last_name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
