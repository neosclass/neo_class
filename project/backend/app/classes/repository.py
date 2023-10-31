from sqlalchemy import select

from app.utils.repository import SQLAlchemyRepository

from app.classes.models import Class, Task
from app.users.models import User

from app.database import async_session_maker


class ClassRepository(SQLAlchemyRepository):
    model = Class

    @classmethod
    async def create_class(cls, user_id: int, **data):
        async with async_session_maker() as session:
            this_user = select(User).filter_by(id=user_id)
            result = await session.execute(this_user)
            result = result.scalars().first()

            this_class = Class(**data)

            result.classes.append(this_class)
            await session.commit()

            return this_class


class TaskRepository(SQLAlchemyRepository):
    model = Task

    @classmethod
    async def create_task(cls, class_id: int, **data):
        async with async_session_maker() as session:
            this_class = select(Class).filter_by(id=class_id)
            result = await session.execute(this_class)
            result = result.scalars().first()

            this_task = Task(**data)

            result.tasks.append(this_task)
            await session.commit()

            return this_task

