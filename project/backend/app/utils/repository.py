from abc import ABC, abstractmethod

from sqlalchemy import (insert, select, update, delete)

from app.database import async_session_maker


class AbstractRepository(ABC):
    @abstractmethod
    async def get_object_or_none(self):
        raise NotImplementedError

    @abstractmethod
    async def get_all(self):
        raise NotImplementedError

    @abstractmethod
    async def create(self):
        raise NotImplementedError


class SQLAlchemyRepository(AbstractRepository):
    model = None

    @classmethod
    async def get_object_or_none(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model.__table__.columns).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().one_or_none()

    @classmethod
    async def get_all(cls, **filter_by):
        async with async_session_maker() as session:
            query = select(cls.model.__table__.columns).filter_by(**filter_by)
            result = await session.execute(query)
            return result.mappings().all()

    @classmethod
    async def create(cls, **data):
        async with async_session_maker() as session:
            query = insert(cls.model).values(**data).returning(cls.model)
            result = await session.execute(query)
            await session.commit()
            return result.mappings().first()

    @classmethod
    async def update(cls, id: int, **update_data):
        async with async_session_maker() as session:
            stmt = (
                update(cls.model).where(cls.model.id == id).values(**update_data).returning(cls.model)
            )
            result = await session.execute(stmt)
            await session.commit()
            return result.mappings().first()

    @classmethod
    async def delete(cls, id: int):
        async with async_session_maker() as session:
            stmt = (
                delete(cls.model).where(cls.model.id == id)
            )

            await session.execute(stmt)
            await session.commit()

