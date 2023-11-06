from sqlalchemy import ForeignKey, Table, Column

from project.backend.app.database import Base

# note for a Core table, we use the sqlalchemy.Column construct,
# not sqlalchemy.orm.mapped_column
user_course = Table(
    "user_course",
    Base.metadata,
    Column("user_id", ForeignKey("user.id", ondelete='CASCADE')),
    Column("course_id", ForeignKey("course.id", ondelete='CASCADE')),
)
