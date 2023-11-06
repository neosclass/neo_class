FROM python:3.9.6

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /project

# Copy the poetry files
COPY pyproject.toml poetry.lock /project

# Install Poetry and dependencies
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi

COPY . /project

RUN chmod a+x project/backend/deploy/*.sh