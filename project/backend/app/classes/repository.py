from sqlalchemy import select

from project.backend.app.utils.repository import SQLAlchemyRepository

from project.backend.app.classes.models import Course, Task, File
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


class TaskRepository(SQLAlchemyRepository):
    model = Task

    @classmethod
    async def create_task(cls, course_id: int, description: str, title: str, object_names: list[str]):
        async with async_session_maker() as session:
            this_class = select(Course).filter_by(id=course_id)
            result = await session.execute(this_class)
            result = result.scalars().first()

            this_task = Task(title=title, description=description)
            for name in object_names:
                this_file = File(object_name=name)
                this_task.files.append(this_file)

            result.tasks.append(this_task)
            await session.commit()

            return this_task


class FileRepository(SQLAlchemyRepository):
    model = File

    @classmethod
    async def get_files_all(cls, task_id: int):
        async with async_session_maker() as session:
            this_files = select(File).filter_by(task_id=task_id)
            result = await session.execute(this_files)
            result = result.scalars().all()

            return result
