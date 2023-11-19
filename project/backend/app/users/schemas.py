from datetime import datetime

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    registered_at: datetime
    password: str
    is_admin: bool


class SuccessPost(BaseModel):
    success: bool

    class Config:
        orm_mode = True


class CourseId(BaseModel):
    id: int

    class Config:
        orm_mode = True