from datetime import datetime

from pydantic import BaseModel


class FileSchema(BaseModel):
    id: int
    object_name: str
    task_id: int

    class Config:
        orm_mode = True


class CourseSchema(BaseModel):
    id: int
    created_by: int
    description: str
    title: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class CreateTaskSchema(BaseModel):
    id: int
    course_id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
    files: list[FileSchema]

    class Config:
        orm_mode = True


class TaskSchema(BaseModel):
    id: int
    course_id: int
    title: str
    description: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SuccessDelete(BaseModel):
    success: bool

    class Config:
        orm_mode = True
