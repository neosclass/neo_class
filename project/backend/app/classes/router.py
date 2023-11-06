import tempfile
import zipfile
from typing import Annotated

from fastapi import APIRouter, status, Depends, UploadFile, File
from fastapi.responses import FileResponse
from fastapi_cache.decorator import cache

from project.backend.app.users.models import User
from project.backend.app.auth.dependencies import get_current_user

from project.backend.app.classes.service import CourseService, TaskService, FileService
from project.backend.app.classes.dependencies import course_service, task_service, file_service
from project.backend.app.classes.schemas import CourseSchema, TaskSchema, SuccessDelete, CreateTaskSchema

from project.backend.app.utils.s3 import client
from project.backend.app.config import CACHE_EXPIRE

router = APIRouter(prefix='/courses', tags=['Courses'])


@router.post('/create', status_code=status.HTTP_201_CREATED, response_model=CourseSchema)
async def create_course(title: str, description: str, course_service: Annotated[CourseService, Depends(course_service)],
                        user: User = Depends(get_current_user)):
    result = await course_service.create_course(user_id=user.id, description=description, title=title)
    return result


@router.get('/get/{course_id}', status_code=status.HTTP_200_OK, response_model=CourseSchema)
@cache(expire=CACHE_EXPIRE)
async def get_course(course_id: int, course_service: Annotated[CourseService, Depends(course_service)],
                     user: User = Depends(get_current_user)):
    course_user = await course_service.get_course(course_id)
    return course_user


@router.put('/update/{course_id}', status_code=status.HTTP_201_CREATED, response_model=CourseSchema)
async def update_course(title: str, description: str, course_id: int,
                        course_service: Annotated[CourseService, Depends(course_service)],
                        user: User = Depends(get_current_user)):
    update_course_user = await course_service.update_course(course_id=course_id, title=title, description=description)
    return update_course_user


@router.delete('/delete/course_id}', status_code=status.HTTP_200_OK, response_model=SuccessDelete)
async def delete_class(course_id: int, class_service: Annotated[CourseService, Depends(course_service)],
                       user: User = Depends(get_current_user)):
    result = await class_service.delete_course(course_id=course_id)
    return result


@router.post('/{course_id}/task/create', status_code=status.HTTP_201_CREATED, response_model=CreateTaskSchema)
async def create_task(title: str, description: str, course_id: int,
                      task_service: Annotated[TaskService, Depends(task_service)], files: list[UploadFile] = File(...),
                      user: User = Depends(get_current_user)):
    result = await task_service.create_task(course_id=course_id, description=description, title=title, files=files)
    return result


@router.get('/{course_id}/task/get/{task_id}/info', status_code=status.HTTP_201_CREATED, response_model=TaskSchema)
@cache(expire=CACHE_EXPIRE)
async def get_task_info(course_id: int, task_id: int, task_service: Annotated[TaskService, Depends(task_service)],
                        user: User = Depends(get_current_user)):
    result = await task_service.get_task(course_id=course_id, task_id=task_id)
    return result


@router.get('/{course_id}/task/get/{task_id}/files', status_code=status.HTTP_201_CREATED)
@cache(expire=CACHE_EXPIRE)
async def get_task_file(task_id: int, file_service: Annotated[FileService, Depends(file_service)],
                        user: User = Depends(get_current_user)):
    files = await file_service.get_files_all(task_id=task_id)

    # Создание временного файла
    with tempfile.NamedTemporaryFile(suffix='.zip', delete=False) as tmp:
        # Создание объекта ZipFile
        with zipfile.ZipFile(tmp, mode='w') as zip:
            # Добавление файлов в архив
            # Loop through each file and add it to the zip archive
            for file_name in files:
                # Get file data from Minio
                file_data = client.get_object('task-files', file_name.object_name).read()

                # Add file data to the zip archive with the same file name
                zip.writestr(file_name.object_name, file_data)

        return FileResponse(path=tmp.name, filename=f'{tmp.name}.zip', media_type='application/zip')


@router.put('/{course_id}/task/update/{task_id}', status_code=status.HTTP_201_CREATED, response_model=TaskSchema)
async def update_task(title: str, description: str, course_id: int, task_id: int,
                      task_service: Annotated[TaskService, Depends(task_service)],
                      user: User = Depends(get_current_user)):
    update_task_user = await task_service.update_task(course_id=course_id, title=title,
                                                      description=description,
                                                      task_id=task_id)
    return update_task_user


@router.delete('/{class_id}/task/delete/{task_id}', status_code=status.HTTP_200_OK, response_model=SuccessDelete)
async def delete_task(task_id: int, task_service: Annotated[TaskService, Depends(task_service)],
                      user: User = Depends(get_current_user)):
    result = await task_service.delete_task(task_id=task_id)
    return result
