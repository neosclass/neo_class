from datetime import datetime
from typing import Union

from pydantic import BaseModel


class UserSchema(BaseModel):
    id: int
    email: str
    name: str
    surname: str
    phone_number: Union[None, str]
    registered_at: datetime
    password: str
    is_admin: bool
