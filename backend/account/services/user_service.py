
from ..repositories.user_repository import UserRepository
from ..serializers import SignUpSerializer, UserSerializer

class UserService:
    def __init__(self, user_repository=None):
        self.user_repository = user_repository or UserRepository()

    def register_user(self, data):
        user = SignUpSerializer(data=data)
        if user.is_valid():
            if not self.user_repository.get_user_by_email(data['email']):
                created_user = self.user_repository.create_user(data)
                return UserSerializer(created_user).data
            else:
                raise ValueError('User already exists')
        else:
            raise ValueError(user.errors)

    def get_current_user(self, user):
        return UserSerializer(user).data

    def update_user(self, user, data):
        updated_user = self.user_repository.update_user(user, data)
        return UserSerializer(updated_user).data

    def upload_resume(self, user, resume):
        return self.user_repository.upload_resume(user, resume)

    def download_resume(self, user):
        return self.user_repository.download_resume(user)