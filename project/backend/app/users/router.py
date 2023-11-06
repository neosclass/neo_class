from typing import Annotated

from fastapi import APIRouter, status, Depends
from fastapi_cache.decorator import cache

from project.backend.app.auth.dependencies import get_current_user

from project.backend.app.users.models import User
from project.backend.app.users.service import UserService
from project.backend.app.users.dependencies import users_service
from project.backend.app.users.schemas import UserSchema

from project.backend.app.config import CACHE_EXPIRE

router = APIRouter(prefix='/users', tags=['Users'])


@router.get('/profile', status_code=status.HTTP_200_OK)
@cache(expire=CACHE_EXPIRE)
async def get_current_user_private_info(user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)) \
        -> UserSchema:
    result = await user_service.get_private_profile(id=user.id)
    return result
