#!/bin/bash

alembic upgrade 0e7d6c49b85a

gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000