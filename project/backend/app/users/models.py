from datetime import datetime

from sqlalchemy import (
    TIMESTAMP,
    Boolean,
    Column,
    Integer,
    LargeBinary,
    String,
)

from database import Base


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(length=254), nullable=False)
    name = Column(String(length=254), nullable=False)
    surname = Column(String(length=254), nullable=False)
    phone_number = Column(String)

    registered_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)
    password = Column(LargeBinary, nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)