# Use the official Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Flask app and model to the container
COPY app.py /app/
COPY ./sentiment_classification/model.keras /app/ 
COPY ./sentiment_classification/LogisticRegression.pkl /app/
COPY ./mental_illness_classification/model.keras /app/

# Install Python dependencies
RUN pip install flask nltk numpy pickle re scikit-learn spacy tensorflow tensorflowjs

# Expose the port Flask will run on
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
