from app.utils.repository import AbstractRepository


class ClassService:
    def __init__(self, users_repo: AbstractRepository):
        self.class_repo: AbstractRepository = users_repo()

    async def create_class(self, user_id: int, description: str, title: str):
        user_class = await self.class_repo.create(created_by=user_id, description=description, title=title)
        return user_class

    async def get_class(self, class_id: int):
        user_class = await self.class_repo.get_object_or_none(id=class_id)
        return user_class

    async def update_class(self, class_id: int, description: str, title: str):
        user_class = await self.class_repo.update(class_id, description=description, title=title)
        return user_class

    async def delete_class(self, class_id: int):
        delete_class = await self.class_repo.delete(id=class_id)


class TaskService:
    def __init__(self, users_repo: AbstractRepository):
        self.task_repo: AbstractRepository = users_repo()
