import uuid

from fastapi import UploadFile

from project.backend.app.utils.repository import AbstractRepository

from project.backend.app.utils.s3 import client

from project.backend.app.config import BUCKET


class TaskService:
    def __init__(self, users_repo: AbstractRepository):
        self.task_repo: AbstractRepository = users_repo()

    # TODO сделать валидацию по расширениям файла
    async def create_task(self, course_id: int, description: str, title: str, files: list[UploadFile]):
        object_names = []
        for file in files:
            file_uuid = str(uuid.uuid4())
            client.put_object(BUCKET, file_uuid+'.jpg', data=file.file, content_type=file.content_type, length=-1,
                              part_size=10 * 1024 * 1024)
            object_names.append(file_uuid+'.jpg')
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
        return {'success': True}
    

class FileService:
    def __init__(self, users_repo: AbstractRepository):
        self.file_repo: AbstractRepository = users_repo()

    async def get_files_all(self, task_id: int):
        files = await self.file_repo.get_files_all(task_id=task_id)

        return files
