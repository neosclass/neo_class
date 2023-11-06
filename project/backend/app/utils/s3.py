from minio import Minio

from project.backend.app.config import ENDPOINT_URL, ACCESS_KEY, SECRET_KEY

client = Minio(
    ENDPOINT_URL,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    secure=False,
)
