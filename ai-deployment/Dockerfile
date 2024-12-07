# Use the official Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Flask app and model to the container
COPY app.py /app/
COPY ./sentiment_classification/model.keras /app/ 
COPY ./sentiment_classification/LogisticRegression.pkl /app/
COPY ./mental_illness_classification/model.keras /app/
COPY requirements.txt .

RUN apt-get update && apt-get install -y \
    build-essential \
    libjpeg-dev \
    liblapack-dev \
    libopenblas-dev \
    libpng-dev \
    python3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

RUN python -m spacy download en_core_web_sm

COPY . .

# Expose the port Flask will run on
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
