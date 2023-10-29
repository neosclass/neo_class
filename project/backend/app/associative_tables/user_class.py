from sqlalchemy import ForeignKey, Table, Column
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

# note for a Core table, we use the sqlalchemy.Column construct,
# not sqlalchemy.orm.mapped_column
user_class = Table(
    "user_class",
    Base.metadata,
    Column("user_id", ForeignKey("user.id", ondelete='CASCADE')),
    Column("class_id", ForeignKey("class.id", ondelete='CASCADE')),
)
