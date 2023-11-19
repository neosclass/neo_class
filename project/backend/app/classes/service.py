from project.backend.app.utils.repository import AbstractRepository


class CourseService:
    def __init__(self, users_repo: AbstractRepository):
        self.course_repo: AbstractRepository = users_repo()

    async def create_course(self, user_id: int, description: str, title: str):
        user_course = await self.course_repo.create_course(user_id=user_id, created_by=user_id, description=description,
                                                           title=title)
        return user_course

    async def get_course(self, course_id: int):
        user_class = await self.course_repo.get_object_or_none(id=course_id)
        return user_class

    async def update_course(self, course_id: int, description: str, title: str):
        user_course = await self.course_repo.update(course_id, description=description, title=title)
        return user_course

    async def delete_course(self, course_id: int):
        await self.course_repo.delete(id=course_id)
        return {"success": True}

    async def get_all_courses_private(self, user_id: int):
        all_courses = await self.course_repo.get_all_courses_private(user_id=user_id)
        return all_courses

    async def get_all_tasks_from_course(self, course_id: int):
        all_tasks = await self.course_repo.get_all_tasks_from_course(course_id=course_id)
        return all_tasks
