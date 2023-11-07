from datetime import datetime

from sqlalchemy import (
    ForeignKey, text,
)

from project.backend.app.database import Base
from project.backend.app.tasks.models import Task

from sqlalchemy.orm import relationship, Mapped, mapped_column


class Course(Base):
    __tablename__ = 'course'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    created_by: Mapped[int] = mapped_column(ForeignKey('user.id', ondelete='CASCADE'))
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    updated_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"),
                                                 onupdate=datetime.now)

    tasks: Mapped[list['Task']] = relationship(lazy="selectin", cascade="all, delete", passive_deletes=True)
