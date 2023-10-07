from utils.repository import SQLAlchemyRepository

from users.models import User


class UserRepository(SQLAlchemyRepository):
    model = User
