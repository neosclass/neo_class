#!/bin/bash

alembic upgrade 36084d576944

gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000