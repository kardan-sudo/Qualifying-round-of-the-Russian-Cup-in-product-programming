FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY SBP /code/SBP
COPY SBP/manage.py .
COPY SBP/win /code/win

# Пример для запуска через gunicorn
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
