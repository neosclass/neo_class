from users.repository import UserRepository
from users.service import UserService


def users_service():
    return UserService(UserRepository)
