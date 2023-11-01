from datetime import datetime

from sqlalchemy import (
    LargeBinary,
    text,
)

from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.associative_tables.user_class import user_course


class User(Base):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    password: Mapped[str] = mapped_column(LargeBinary, nullable=False)
    email: Mapped[str] = mapped_column(nullable=False)
    registered_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"))
    name: Mapped[str] = mapped_column(nullable=False)
    surname: Mapped[str] = mapped_column(nullable=False)
    is_admin: Mapped[bool] = mapped_column(default=False, nullable=False)

    classes: Mapped[list['Course']] = relationship(secondary=user_course, lazy="selectin")
