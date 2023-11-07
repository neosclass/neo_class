from sqlalchemy import select

from project.backend.app.utils.repository import SQLAlchemyRepository

from project.backend.app.comments.models import Comment

from project.backend.app.tasks.models import Task

from project.backend.app.database import async_session_maker


class CommentRepository(SQLAlchemyRepository):
    model = Comment

    @staticmethod
    async def create_comment(user_id: int, task_id: int, data: str):
        async with async_session_maker() as session:
            stmt = select(Task).filter_by(id=task_id)
            task = await session.execute(stmt)
            task = task.scalars().first()

            comment = Comment(user_id=user_id, task_id=task_id, data=data)

            task.comments.append(comment)

            await session.commit()

            return comment

    @staticmethod
    async def get_all_comments(task_id: int):
        async with async_session_maker() as session:
            stmt = select(Comment).filter_by(task_id=task_id)
            comment = await session.execute(stmt)
            comment = comment.scalars().all()

            return comment
