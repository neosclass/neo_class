from project.backend.app.classes.repository import CourseRepository
from project.backend.app.classes.service import CourseService


def course_service():
    return CourseService(CourseRepository)
