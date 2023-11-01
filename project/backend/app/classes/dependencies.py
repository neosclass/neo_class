from app.classes.repository import CourseRepository, TaskRepository, FileRepository
from app.classes.service import CourseService, TaskService, FileService


def course_service():
    return CourseService(CourseRepository)


def task_service():
    return TaskService(TaskRepository)


def file_service():
    return FileService(FileRepository)
