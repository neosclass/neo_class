from sqlalchemy import Column, ForeignKey
from sqlalchemy.testing.schema import Table

from app.database import Base

user_class = Table(
    'user_class',
    Base.metadata,
    Column('user_id', ForeignKey("user.id"), primary_key=True),
    Column('class_id', ForeignKey("class.id"), primary_key=True),
)