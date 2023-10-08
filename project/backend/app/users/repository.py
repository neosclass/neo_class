from app.utils.repository import SQLAlchemyRepository

from app.users.models import User


class UserRepository(SQLAlchemyRepository):
    model = User
