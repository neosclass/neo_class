from datetime import datetime

from pydantic import BaseModel


class ClassSchema(BaseModel):
    id: int
    created_by: int
    description: str
    title: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class TaskSchema(BaseModel):
    id: int
    class_id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    file_url: str

    class Config:
        orm_mode = True


class SuccessDelete(BaseModel):
    success: bool

    class Config:
        orm_mode = True
