from app.utils.repository import SQLAlchemyRepository

from app.classes.models import Class, Task


class ClassRepository(SQLAlchemyRepository):
    model = Class


class TaskRepository(SQLAlchemyRepository):
    model = Task
