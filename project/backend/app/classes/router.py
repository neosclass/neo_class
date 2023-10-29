from typing import Annotated

from fastapi import APIRouter, status, Depends

from app.users.models import User
from app.auth.dependencies import get_current_user

from app.classes.service import ClassService, TaskService
from app.classes.dependencies import class_service, task_service
from app.classes.schemas import ClassSchema, TaskSchema, SuccessDelete

router = APIRouter(prefix='/classes', tags=['Classes'])


@router.post('/create', status_code=status.HTTP_201_CREATED, response_model=ClassSchema)
async def create_class(title: str, description: str, class_service: Annotated[ClassService, Depends(class_service)],
                       user: User = Depends(get_current_user)):
    result = await class_service.create_class(user_id=user.id, description=description, title=title)
    return result


@router.get('/get/{class_id}', status_code=status.HTTP_200_OK, response_model=ClassSchema)
async def get_class(class_id: int, class_service: Annotated[ClassService, Depends(class_service)],
                    user: User = Depends(get_current_user)):
    class_user = await class_service.get_class(class_id)
    return class_user


@router.put('/update/{class_id}', status_code=status.HTTP_201_CREATED, response_model=ClassSchema)
async def update_class(title: str, description: str, class_id: int,
                       class_service: Annotated[ClassService, Depends(class_service)],
                       user: User = Depends(get_current_user)):
    update_class_user = await class_service.update_class(class_id=class_id, title=title, description=description)
    return update_class_user


@router.delete('/delete/{class_id}', status_code=status.HTTP_200_OK, response_model=SuccessDelete)
async def delete_class(class_id: int, class_service: Annotated[ClassService, Depends(class_service)],
                       user: User = Depends(get_current_user)):
    result = await class_service.delete_class(class_id=class_id)
    return result


@router.post('/{class_id}/task/create', status_code=status.HTTP_201_CREATED, response_model=TaskSchema)
async def create_task(title: str, description: str, class_id: int,
                      task_service: Annotated[TaskService, Depends(task_service)],
                      user: User = Depends(get_current_user)):
    result = await task_service.create_task(class_id=class_id, description=description, title=title)
    return result


@router.get('/{class_id}/task/get/{task_id}', status_code=status.HTTP_201_CREATED, response_model=TaskSchema)
async def get_task(class_id: int, task_id: int, task_service: Annotated[TaskService, Depends(task_service)],
                   user: User = Depends(get_current_user)):
    result = await task_service.get_task(class_id=class_id, task_id=task_id)
    return result


@router.put('/{class_id}/task/update/{task_id}', status_code=status.HTTP_201_CREATED, response_model=TaskSchema)
async def update_task(title: str, description: str, class_id: int, task_id: int,
                      task_service: Annotated[TaskService, Depends(task_service)],
                      user: User = Depends(get_current_user)):
    update_task_user = await task_service.update_task(class_id=class_id, title=title,
                                                      description=description,
                                                      task_id=task_id)
    return update_task_user


@router.delete('/{class_id}/task/delete/{task_id}', status_code=status.HTTP_200_OK, response_model=SuccessDelete)
async def delete_task(task_id: int, task_service: Annotated[TaskService, Depends(task_service)],
                      user: User = Depends(get_current_user)):
    result = await task_service.delete_task(task_id=task_id)
    return result
