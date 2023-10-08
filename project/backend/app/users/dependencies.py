from app.users.repository import UserRepository
from app.users.service import UserService


def users_service():
    return UserService(UserRepository)
