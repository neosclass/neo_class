from datetime import datetime

from pydantic import BaseModel


class CourseSchema(BaseModel):
    id: int
    created_by: int
    description: str
    title: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SuccessDelete(BaseModel):
    success: bool

    class Config:
        orm_mode = True


class CreateCourse(BaseModel):
    title: str
    description: str

    class Config:
        orm_mode = True
