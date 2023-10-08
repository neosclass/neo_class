from typing import Annotated

from fastapi import APIRouter, status, Depends

from auth.dependencies import get_current_user

from users.models import User
from users.service import UserService
from users.dependencies import users_service
from users.schemas import UserSchema

router = APIRouter(prefix='/users', tags=['Users'])


@router.get('/profile', status_code=status.HTTP_200_OK)
async def get_current_user_private_info(user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)) \
        -> UserSchema:
    result = await user_service.get_private_profile(id=user.id)
    return result
