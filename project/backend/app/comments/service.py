from project.backend.app.utils.repository import AbstractRepository


class CommentService():
    def __init__(self, comment_repo: AbstractRepository):
        self.comment_repo: AbstractRepository = comment_repo()

    async def create_comment(self, user_id: int, task_id: int, data: str):
        comment = await self.comment_repo.create_comment(user_id=user_id, task_id=task_id, data=data)

        return comment

    async def get_all_comments(self, task_id: int):
        comments = await self.comment_repo.get_all_comments(task_id=task_id)
        return comments

    async def update_comment(self, comment_id: int, data: str):
        comment = await self.comment_repo.update(id=comment_id, data=data)
        return comment

    async def delete_comment(self, comment_id: int):
        await self.comment_repo.delete(id=comment_id)
        return {'success': True}