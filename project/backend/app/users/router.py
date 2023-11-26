from typing import Annotated
from jose import jwt

from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse

from project.backend.app.auth.dependencies import get_current_user

from project.backend.app.users.models import User
from project.backend.app.users.service import UserService
from project.backend.app.users.dependencies import users_service
from project.backend.app.users.schemas import UserSchema, SuccessPost, CourseId

from project.backend.app.config import JWT_SECRET

router = APIRouter(prefix='/users', tags=['Users'])


@router.get('/profile', status_code=status.HTTP_200_OK, response_model=UserSchema)
async def get_current_user_private_info(user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)):
    result = await user_service.get_private_profile(id=user.id)
    return result


@router.post('/add/course', status_code=status.HTTP_201_CREATED, response_model=SuccessPost)
async def add_user_to_course(course_id: CourseId, user_service: Annotated[UserService, Depends(users_service)],
                                        user: User = Depends(get_current_user)):
    result = await user_service.add_user_to_course(user_id=user.id, course_id=course_id.id)
    return result


@router.get("/get_current_user_id")
async def get_jwt_from_cookie(request: Request):
    jwt_cookie = request.cookies.get("access-token")
    if jwt_cookie:
        try:
            jwt_payload = jwt.decode(jwt_cookie, JWT_SECRET, algorithms=["HS256"])
            user_id = jwt_payload.get("sub")
            return JSONResponse(content={"user_id": user_id})
        except jwt.ExpiredSignatureError:
            return JSONResponse(status_code=401, content={"detail": "JWT has expired"})
        except jwt.InvalidTokenError:
            return JSONResponse(status_code=401, content={"detail": "Invalid JWT"})
    else:
        return JSONResponse(status_code=401, content={"detail": "JWT not found in cookie"})

