#!/bin/bash

alembic upgrade 4a56a28b8846

gunicorn app.main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000