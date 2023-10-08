from app.utils.repository import AbstractRepository


class ClassService:
    def __init__(self, users_repo: AbstractRepository):
        self.class_repo: AbstractRepository = users_repo()


class TaskService:
    def __init__(self, users_repo: AbstractRepository):
        self.task_repo: AbstractRepository = users_repo()
