from datetime import datetime

from pydantic import BaseModel


class CommentSchema(BaseModel):
    id: int
    user_id: int
    task_id: int
    data: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class CommentAdd(BaseModel):
    data: str

    class Config:
        orm_mode = True


class SuccessDelete(BaseModel):
    success: bool

    class Config:
        orm_mode = True
