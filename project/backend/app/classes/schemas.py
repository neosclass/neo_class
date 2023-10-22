from datetime import datetime

from pydantic import BaseModel


class ClassSchema(BaseModel):
    id: int
    created_by: int
    description: str
    title: str
    created_at: datetime
    updated_at: datetime
