from app.utils.repository import AbstractRepository


class ClassService:
    def __init__(self, users_repo: AbstractRepository):
        self.class_repo: AbstractRepository = users_repo()

    async def create_class(self, user_id: int, description: str, title: str):
        user_class = await self.class_repo.create_class(user_id=user_id, created_by=user_id, description=description,
                                                        title=title)
        return user_class

    async def get_class(self, class_id: int):
        user_class = await self.class_repo.get_object_or_none(id=class_id)
        return user_class

    async def update_class(self, class_id: int, description: str, title: str):
        user_class = await self.class_repo.update(class_id, description=description, title=title)
        return user_class

    async def delete_class(self, class_id: int):
        await self.class_repo.delete(id=class_id)
        return {"success": True}


class TaskService:
    def __init__(self, users_repo: AbstractRepository):
        self.task_repo: AbstractRepository = users_repo()

    async def create_task(self, class_id: int, description: str, title: str, file):
        user_task = await self.task_repo.create_task(class_id=class_id, description=description, title=title, file_url=file.filename)
        return user_task

    async def get_task(self, class_id: int, task_id: int):
        user_task = await self.task_repo.get_object_or_none(id=task_id, class_id=class_id)
        return user_task

    async def update_task(self, class_id: int, description: str, title: str, task_id: int):
        user_task = await self.task_repo.update(class_id=class_id, description=description, title=title, id=task_id)
        return user_task

    async def delete_task(self, task_id: int):
        await self.task_repo.delete(id=task_id)
        return {"success": True}
