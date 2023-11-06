from project.backend.app.users.repository import UserRepository
from project.backend.app.users.service import UserService


def users_service():
    return UserService(UserRepository)
