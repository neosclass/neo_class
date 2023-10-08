from typing import Annotated

from fastapi import APIRouter, status, Depends

from app.auth.dependencies import get_current_user

from app.users.models import User
from app.users.service import UserService
from app.users.dependencies import users_service
from app.users.schemas import UserSchema

router = APIRouter(prefix='/users', tags=['Users'])


@router.get('/profile', status_code=status.HTTP_200_OK)
async def get_current_user_private_info(user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)) \
        -> UserSchema:
    result = await user_service.get_private_profile(id=user.id)
    return result
