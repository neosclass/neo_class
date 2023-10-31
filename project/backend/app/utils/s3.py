from minio import Minio

from fastapi import APIRouter, File, UploadFile

router = APIRouter(prefix='/alo')

client = Minio(
    'myminio:9000',
    access_key="minioadmin",
    secret_key="minioadmin",
    secure=False,
)


@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    client.put_object(
        "task-files",
        "object",
        data=file.file,
        content_type=file.content_type,
        length=len(file.filename)
    )
    return file.filename