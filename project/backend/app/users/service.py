from project.backend.app.utils.repository import AbstractRepository


class UserService:
    def __init__(self, users_repo: AbstractRepository):
        self.user_repo: AbstractRepository = users_repo()

    async def get_private_profile(self, id: int):
        profile = await self.user_repo.get_object_or_none(id=id)
        return profile

    async def add_user_to_course(self, user_id: int, course_id: int):
        success = await self.user_repo.add_user_to_course(user_id=user_id, course_id=course_id)
        return success
