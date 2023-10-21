from datetime import datetime

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    email: str
    name: str
    registered_at: datetime
    password: str
