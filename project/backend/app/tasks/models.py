from datetime import datetime

from sqlalchemy import (
    ForeignKey, text,
)

from project.backend.app.database import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column


class Task(Base):
    __tablename__ = 'task'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    course_id: Mapped[int] = mapped_column(ForeignKey('course.id', ondelete='CASCADE'))
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    updated_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"),
                                                 onupdate=datetime.now)

    files: Mapped[list['File']] = relationship(lazy="selectin")
    comments: Mapped[list['Comment']] = relationship(lazy="selectin")


class File(Base):
    __tablename__ = 'file'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    object_name: Mapped[str] = mapped_column(nullable=False)
    task_id: Mapped[int] = mapped_column(ForeignKey('task.id'))


class Comment(Base):
    __tablename__ = 'comment'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id', ondelete='CASCADE'))
    task_id: Mapped[int] = mapped_column(ForeignKey('task.id'))
    data: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"),
                                                 onupdate=datetime.now)
