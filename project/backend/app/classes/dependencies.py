from app.classes.repository import ClassRepository, TaskRepository
from app.classes.service import ClassService, TaskService


def class_service():
    return ClassService(ClassRepository)


def task_service():
    return TaskService(TaskRepository)
