from typing import Annotated

from fastapi import APIRouter, status, Depends

from project.backend.app.comments.dependencies import comment_service
from project.backend.app.comments.service import CommentService
from project.backend.app.comments.schemas import CommentSchema, SuccessDelete, CommentAdd

from project.backend.app.users.models import User
from project.backend.app.auth.dependencies import get_current_user

router = APIRouter(prefix='/comment', tags=['Comments'])


@router.post('/{task_id}', status_code=status.HTTP_201_CREATED, response_model=CommentSchema)
async def create_comment(task_id: int, task_data: CommentAdd,  comment_service: Annotated[CommentService, Depends(comment_service)],
                         user: User = Depends(get_current_user)):
    result = await comment_service.create_comment(user_id=user.id, task_id=task_id, data=task_data.data)
    return result


@router.get('/{task_id}', status_code=status.HTTP_200_OK, response_model=list[CommentSchema])
async def get_comments(task_id: int, comment_service: Annotated[CommentService, Depends(comment_service)],
                         user: User = Depends(get_current_user)):
    comments = await comment_service.get_all_comments(task_id=task_id)
    return comments


@router.put('/{task_id}/{comment_id}', status_code=status.HTTP_201_CREATED, response_model=CommentSchema)
async def update_comment(comment_id: int, data: str, comment_service: Annotated[CommentService, Depends(comment_service)],
                         user: User = Depends(get_current_user)):
    result = await comment_service.update_comment(comment_id=comment_id, data=data)
    return result


@router.delete('/{task_id}/{comment_id}', status_code=status.HTTP_200_OK, response_model=SuccessDelete)
async def delete_comment(comment_id: int, comment_service: Annotated[CommentService, Depends(comment_service)],
                         user: User = Depends(get_current_user)):
    result = await comment_service.delete_comment(comment_id=comment_id)
    return result
