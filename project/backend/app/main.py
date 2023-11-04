from fastapi import FastAPI
from fastapi.openapi.docs import get_swagger_ui_html
from starlette.middleware.cors import CORSMiddleware

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis

from app.auth.router import router as auth_router
from app.users.router import router as user_router
from app.classes.router import router as class_router

from app.config import REDIS_HOST, REDIS_PORT

app = FastAPI(title='Neo class', openapi_url='/api/v1/openapi.json',
              swagger_ui_oauth2_redirect_url='/api/v1/docs/oauth2-redirect')


@app.get("/api/v1/docs", include_in_schema=False)
async def get_documentation():
    return get_swagger_ui_html(openapi_url="openapi.json", title="Swagger")


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


@app.on_event("startup")
async def startup_event():
    redis = aioredis.from_url(f"redis://{REDIS_HOST}:{REDIS_PORT}", encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")


app.include_router(auth_router)
app.include_router(user_router)
app.include_router(class_router)
