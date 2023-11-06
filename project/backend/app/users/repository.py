from project.backend.app.utils.repository import SQLAlchemyRepository

from project.backend.app.users.models import User


class UserRepository(SQLAlchemyRepository):
    model = User
