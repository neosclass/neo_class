import uuid

from fastapi import UploadFile

from app.utils.repository import AbstractRepository

from app.utils.s3 import client

from app.config import BUCKET


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
        await self.class_repo.delete(id=course_id)
        return {"success": True}


class TaskService:
    def __init__(self, users_repo: AbstractRepository):
        self.task_repo: AbstractRepository = users_repo()

    async def create_task(self, course_id: int, description: str, title: str, files: list[UploadFile]):
        object_names = []
        for file in files:
            file_uuid = str(uuid.uuid4())
            client.put_object(BUCKET, file_uuid, data=file.file, content_type=file.content_type, length=-1,
                              part_size=10 * 1024 * 1024)
            object_names.append(file_uuid)
        user_task = await self.task_repo.create_task(course_id=course_id, description=description, title=title,
                                                     object_names=object_names)
        return user_task

    async def get_task(self, course_id: int, task_id: int):
        user_task = await self.task_repo.get_object_or_none(id=task_id, course_id=course_id)
        return user_task

    async def update_task(self, course_id: int, description: str, title: str, task_id: int):
        user_task = await self.task_repo.update(course_id=course_id, description=description, title=title, id=task_id)
        return user_task

    async def delete_task(self, task_id: int):
        await self.task_repo.delete(id=task_id)
        return {"success": True}


class FileService:
    def __init__(self, users_repo: AbstractRepository):
        self.file_repo: AbstractRepository = users_repo()

    async def get_files_all(self, task_id: int):
        files = await self.file_repo.get_files_all(task_id=task_id)

        return files
