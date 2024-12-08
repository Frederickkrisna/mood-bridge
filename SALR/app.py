import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import re
from string import punctuation
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

loaded_model_SALR = pickle.load(open('./sentiment_classification/LogisticRegression.pkl', 'rb'))
print('Loaded SALR model')
print({loaded_model_SALR})

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'\[\]]*', '', text)
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    text = re.sub(r'<.*?>+', '', text)
    text = re.sub(r'[%s]' % re.escape(punctuation), '', text)
    text = re.sub(r'\n', '', text)
    text = re.sub(r'\w*\d\w*', '', text)
    return text

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Sentiment Analysis using Logistic Regression API. Use the /salr-predict endpoint for predictions."

@app.route('/salr-predict', methods=['POST'])
def salr_predict():
    try:
        data = request.json
        if 'input' not in data:
            return jsonify({'error': 'Invalid Input Data'}), 400
        text = data['input']
        if len(text.strip()) == 0:
            return jsonify({'error': 'Invalid Input Data'}), 400
        text = preprocess_text(text)
        text = [text]
        vectorizer = pickle.load(open('./sentiment_classification/TfidfVectorizer.pkl', 'rb'))
        text = vectorizer.transform(text)
        prediction = loaded_model_SALR.predict(text)
        return jsonify({'prediction': prediction[0]}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)