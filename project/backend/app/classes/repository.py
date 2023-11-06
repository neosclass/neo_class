from sqlalchemy import select

from project.backend.app.utils.repository import SQLAlchemyRepository

from project.backend.app.classes.models import Course
from project.backend.app.users.models import User

from project.backend.app.database import async_session_maker


class CourseRepository(SQLAlchemyRepository):
    model = Course

    @classmethod
    async def create_course(cls, user_id: int, **data):
        async with async_session_maker() as session:
            this_user = select(User).filter_by(id=user_id)
            result = await session.execute(this_user)
            result = result.scalars().first()

            this_course = Course(**data)

            result.classes.append(this_course)
            await session.commit()

            return this_course
