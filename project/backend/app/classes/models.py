from datetime import datetime

from sqlalchemy import (
    TIMESTAMP,
    Column,
    Integer,
    String,
    ForeignKey,
)

from app.database import Base
from sqlalchemy.orm import relationship


class Class(Base):
    __tablename__ = 'class'

    id = Column(Integer, primary_key=True)
    name = Column(String(length=254), nullable=False)
    description = Column(String(length=254), nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)


class Task(Base):
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True)
    name = Column(String(length=254), nullable=False)
    id_class = Column(ForeignKey('class.id'), nullable=False)
    description = Column(String(length=254), nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)
    file_path = Column(String(length=600))

    comments = relationship('Comment', backref='post', cascade='all, delete')


class Comment(Base):
    __tablename__ = 'comment'

    id = Column(Integer, primary_key=True)
    text = Column(String(400))
    file_path = Column(String(length=600))
    created_at = Column(TIMESTAMP, default=datetime.utcnow, nullable=False)
    id_class = Column(Integer, ForeignKey('class.id'))
