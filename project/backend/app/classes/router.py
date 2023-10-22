from typing import Annotated

from fastapi import APIRouter, status, Depends

from app.users.models import User
from app.auth.dependencies import get_current_user

from app.classes.service import ClassService
from app.classes.dependencies import class_service
from app.classes.schemas import ClassSchema

router = APIRouter(prefix='/classes', tags=['Classes'])


@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create_class(title: str, description: str, class_service: Annotated[ClassService, Depends(class_service)],
                       user: User = Depends(get_current_user)):
    result = await class_service.create_class(user_id=user.id, description=description, title=title)
    return result


@router.get('/get/{class_id}', status_code=status.HTTP_200_OK)
async def get_class(class_id: int, class_service: Annotated[ClassService, Depends(class_service)],
                    user: User = Depends(get_current_user)) -> ClassSchema:
    class_user = await class_service.get_class(class_id)
    return class_user


@router.put('/update/{class_id}', status_code=status.HTTP_201_CREATED)
async def update_class(title: str, description: str, class_id: int,
                       class_service: Annotated[ClassService, Depends(class_service)],
                       user: User = Depends(get_current_user)) -> ClassSchema:
    update_class_user = await class_service.update_class(class_id=class_id, title=title, description=description)
    return update_class_user


@router.delete('/delete/{class_id}', status_code=status.HTTP_200_OK)
async def delete_class(class_id: int, class_service: Annotated[ClassService, Depends(class_service)],
                       user: User = Depends(get_current_user)):
    result = await class_service.delete_class(class_id=class_id)
    return result
