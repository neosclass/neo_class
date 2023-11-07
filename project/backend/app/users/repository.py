from sqlalchemy import select

from project.backend.app.utils.repository import SQLAlchemyRepository

from project.backend.app.users.models import User

from project.backend.app.database import async_session_maker

from project.backend.app.classes.models import Course


class UserRepository(SQLAlchemyRepository):
    model = User

    @staticmethod
    async def add_user_to_course(user_id: int, course_id: int):
        async with async_session_maker() as session:
            stmt = select(User).filter_by(id=user_id)
            user = await session.execute(stmt)
            user = user.scalars().first()

            stmt = select(Course).filter_by(id=course_id)
            course = await session.execute(stmt)
            course = course.scalars().first()

            user.classes.append(course)

            await session.commit()

            return {'success': True}