from project.backend.app.tasks.repository import TaskRepository, FileRepository
from project.backend.app.tasks.service import TaskService, FileService


def task_service():
    return TaskService(TaskRepository)


def file_service():
    return FileService(FileRepository)
