FROM python:3.11-slim

WORKDIR /app

# Install system build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code and dataset
COPY . .

# Expose Flask API port
EXPOSE 5000

ENV FLASK_ENV=production
ENV PORT=5000

# Run Flask backend server
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
