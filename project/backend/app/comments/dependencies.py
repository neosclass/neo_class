from project.backend.app.comments.repository import CommentRepository
from project.backend.app.comments.service import CommentService


def comment_service():
    return CommentService(CommentRepository)
