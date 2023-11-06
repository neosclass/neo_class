from project.backend.app.utils.repository import AbstractRepository


class UserService:
    def __init__(self, users_repo: AbstractRepository):
        self.user_repo: AbstractRepository = users_repo()

    async def get_private_profile(self, id: int):
        profile = await self.user_repo.get_object_or_none(id=id)
        return profile
