from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.auth.router import router as auth_router
from app.users.router import router as user_router

app = FastAPI(title='НеоКласс')

origins = [
    "http://frontend:5000",  # React app
    "http://localhost:3100",  # React app localhost
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    allow_headers=[
        "Content-Type",
        "Set-Cookie",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Authorization",
    ],
)

app.include_router(auth_router)
app.include_router(user_router)
