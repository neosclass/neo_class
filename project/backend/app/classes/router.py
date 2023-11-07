from typing import Annotated

from fastapi import APIRouter, status, Depends
from fastapi_cache.decorator import cache

from project.backend.app.users.models import User
from project.backend.app.auth.dependencies import get_current_user

from project.backend.app.classes.service import CourseService

from project.backend.app.classes.dependencies import course_service

from project.backend.app.classes.schemas import CourseSchema, SuccessDelete

from project.backend.app.config import CACHE_EXPIRE

router = APIRouter(prefix='/courses', tags=['Courses'])


@router.post('', status_code=status.HTTP_201_CREATED, response_model=CourseSchema)
async def create_course(title: str, description: str, course_service: Annotated[CourseService, Depends(course_service)],
                        user: User = Depends(get_current_user)):
    result = await course_service.create_course(user_id=user.id, description=description, title=title)
    return result


@router.get('/{course_id}', status_code=status.HTTP_200_OK, response_model=CourseSchema)
@cache(expire=CACHE_EXPIRE)
async def get_course(course_id: int, course_service: Annotated[CourseService, Depends(course_service)],
                     user: User = Depends(get_current_user)):
    course_user = await course_service.get_course(course_id)
    return course_user


@router.put('/{course_id}', status_code=status.HTTP_201_CREATED, response_model=CourseSchema)
async def update_course(title: str, description: str, course_id: int,
                        course_service: Annotated[CourseService, Depends(course_service)],
                        user: User = Depends(get_current_user)):
    update_course_user = await course_service.update_course(course_id=course_id, title=title, description=description)
    return update_course_user


@router.delete('/{course_id}', status_code=status.HTTP_200_OK, response_model=SuccessDelete)
async def delete_class(course_id: int, class_service: Annotated[CourseService, Depends(course_service)],
                       user: User = Depends(get_current_user)):
    result = await class_service.delete_course(course_id=course_id)
    return result
