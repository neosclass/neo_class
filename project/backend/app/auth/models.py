from datetime import datetime
from uuid import uuid4

from sqlalchemy import (UUID, ForeignKey, text)

from app.database import Base
from sqlalchemy.orm import Mapped, mapped_column


class RefreshToken(Base):
    __tablename__ = 'refresh_token'

    uuid: Mapped[str] = mapped_column(UUID, primary_key=True, default=uuid4)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    refresh_token: Mapped[str] = mapped_column(nullable=False)
    expires_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(server_default=text("TIMEZONE('utc', now())"),
                                                          onupdate=datetime.now)