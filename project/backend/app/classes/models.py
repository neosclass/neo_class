from datetime import datetime

from sqlalchemy import (
    ForeignKey, text,
)

from app.database import Base
from sqlalchemy.orm import relationship, Mapped, mapped_column


class Class(Base):
    __tablename__ = 'class'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    created_by: Mapped[int] = mapped_column(ForeignKey('user.id', ondelete='CASCADE'))
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    updated_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"),
                                                 onupdate=datetime.now)

    #users: Mapped[list["User_Class"]] = relationship(back_populates="my_class")

    task: Mapped[list['Task']] = relationship()


class Task(Base):
    __tablename__ = 'task'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    class_id: Mapped[int] = mapped_column(ForeignKey('class.id'))
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))

    comments: Mapped[list['Comment']] = relationship()


class Comment(Base):
    __tablename__ = 'comment'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id', ondelete='CASCADE'))
    task_id: Mapped[int] = mapped_column(ForeignKey('task.id'))
    data: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"),
                                                 onupdate=datetime.now)
