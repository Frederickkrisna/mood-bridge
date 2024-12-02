import numpy as np
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
import re
from nltk.corpus import stopwords
from sklearn.preprocessing import LabelEncoder
from string import punctuation

from flask import Flask, request, jsonify

app = Flask(__name__)

MODEL_PATH = '../model/keras/model.keras'
loaded_model = tf.keras.models.load_model(MODEL_PATH)
print(loaded_model.summary())

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\[\]]*', '', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'[%s]' % re.escape(punctuation), '', text)
    text = re.sub(r'\n', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text

eng_stopwords = stopwords.words('english')

def remove_stopwords(text: str) -> str:
    return ' '.join([word for word in text.split() if word not in eng_stopwords])

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Sentiment Analysis API. Use the /predict endpoint for predictions."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if 'input' not in data:
            return jsonify({'error': 'Invalid Input Data'}), 400
        text = np.array(data['input'])
        if text.size == 0:
            return jsonify({'error': 'Invalid Input Data'}), 400
        max_sequence_length = loaded_model.input_shape[1]
        tokenizer = tf.keras.preprocessing.text.Tokenizer()
        encoder = LabelEncoder()
        text = preprocess_text(text)
        text = remove_stopwords(text)
        text = tokenizer.texts_to_sequences([text])
        text = tf.keras.preprocessing.sequence.pad_sequences(text, maxlen=max_sequence_length, padding='post', truncating='post')
        prediction = loaded_model.predict(text)
        prediction = prediction.argmax(axis=1)
        prediction = encoder.inverse_transform(prediction)[0]
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)