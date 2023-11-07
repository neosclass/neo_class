from typing import Annotated

from fastapi import APIRouter, status, Depends
from fastapi_cache.decorator import cache

from project.backend.app.auth.dependencies import get_current_user

from project.backend.app.users.models import User
from project.backend.app.users.service import UserService
from project.backend.app.users.dependencies import users_service
from project.backend.app.users.schemas import UserSchema, SuccessPost

from project.backend.app.config import CACHE_EXPIRE

router = APIRouter(prefix='/users', tags=['Users'])


@router.get('/profile', status_code=status.HTTP_200_OK, response_model=UserSchema)
@cache(expire=CACHE_EXPIRE)
async def get_current_user_private_info(user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)):
    result = await user_service.get_private_profile(id=user.id)
    return result


@router.post('/add/course', status_code=status.HTTP_201_CREATED, response_model=SuccessPost)
async def add_user_to_course(course_id: int, user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)):
    result = await user_service.add_user_to_course(user_id=user.id, course_id=course_id)
    return result
