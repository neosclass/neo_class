from fastapi import APIRouter, Depends, Response, status

from auth.config import config
from auth.dependencies import (
    valid_refresh_token,
    valid_refresh_token_user,
    valid_user_create,
)
from auth.jwt import (
    create_access_token,
    create_refresh_token,
    get_token_settings,
    update_refresh_token,
)
from auth.models import RefreshToken
from auth.schemas import (
    UserAccessTokenResponseSchema,
    UserAuthLoginSchema,
    UserAuthRegisterSchema,
)
from auth.service import UserService
from users.models import User

router = APIRouter(prefix='/auth', tags=['Auth'])


@router.post('/register', status_code=status.HTTP_201_CREATED)
async def register_user(
    response: Response,
    auth_data: UserAuthRegisterSchema = Depends(valid_user_create),
) -> UserAccessTokenResponseSchema:
    user = await UserService.create(auth_data)
    refresh_token_value = await create_refresh_token(user_id=user.id)
    access_token_value = await create_access_token(user_id=user.id)

    response.set_cookie(
        **get_token_settings(
            access_token_value,
            config.ACCESS_TOKEN_KEY,
            config.ACCESS_TOKEN_EXP,
        )
    )
    response.set_cookie(
        **get_token_settings(
            refresh_token_value,
            config.REFRESH_TOKEN_KEY,
            config.REFRESH_TOKEN_EXP,
        )
    )

    return UserAccessTokenResponseSchema(
        access_token=access_token_value, refresh_token=refresh_token_value
    )


@router.post('/login', status_code=status.HTTP_200_OK)
async def login_user(
    response: Response,
    auth_data: UserAuthLoginSchema,
) -> UserAccessTokenResponseSchema:
    user = await UserService.authenticate_user(auth_data)
    refresh_token_value = await create_refresh_token(user_id=user.id)
    access_token_value = await create_access_token(
        user_id=user.id,
    )

    response.set_cookie(
        **get_token_settings(
            access_token_value,
            config.ACCESS_TOKEN_KEY,
            config.ACCESS_TOKEN_EXP,
        )
    )
    response.set_cookie(
        **get_token_settings(
            refresh_token_value,
            config.REFRESH_TOKEN_KEY,
            config.REFRESH_TOKEN_EXP,
        )
    )

    return UserAccessTokenResponseSchema(
        access_token=access_token_value,
        refresh_token=refresh_token_value,
    )


@router.put('/refresh')
async def refresh_token(
    response: Response,
    refresh_token: RefreshToken = Depends(valid_refresh_token),
    user: User = Depends(valid_refresh_token_user),
) -> UserAccessTokenResponseSchema:
    '''
    Endpoint for refreshing your access token with your refresh
    token if your access token is expired or someone stole your refresh token.
    '''
    refresh_token_value = await update_refresh_token(
        old_refresh_token=refresh_token
    )
    access_token_value = await create_access_token(user_id=user.id)

    response.set_cookie(
        **get_token_settings(
            refresh_token_value,
            config.REFRESH_TOKEN_KEY,
            config.REFRESH_TOKEN_EXP,
        )
    )

    return UserAccessTokenResponseSchema(
        access_token=access_token_value,
        refresh_token=refresh_token_value,
    )


@router.delete('/logout', status_code=status.HTTP_200_OK)
async def logout_user(
    response: Response,
):
    response.delete_cookie(config.ACCESS_TOKEN_KEY)
    response.delete_cookie(config.REFRESH_TOKEN_KEY)
