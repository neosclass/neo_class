from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


# user_class = Table(
#     'user_class',
#     Base.metadata,
#     Column('user_id', ForeignKey("user.id"), primary_key=True),
#     Column('class_id', ForeignKey("class.id"), primary_key=True),
# )

class User_Class(Base):
    __tablename__ = "user_class"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), primary_key=True)
    class_id: Mapped[int] = mapped_column(
        ForeignKey("class.id"), primary_key=True
    )
    my_class: Mapped["Class"] = relationship(back_populates="users")
    my_user: Mapped["User"] = relationship(back_populates="classes")