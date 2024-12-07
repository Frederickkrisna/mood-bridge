import numpy as np
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
import re
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from sklearn.preprocessing import LabelEncoder
from string import punctuation
import spacy
import pickle
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer

from flask import Flask, request, jsonify

app = Flask(__name__)

loaded_model_SANN = tf.keras.models.load_model('./sentiment_classification/model.keras')
print('Loaded SANN model')
print({loaded_model_SANN.summary()})

loaded_model_SALR = pickle.load(open('./sentiment_classification/LogisticRegression.pkl', 'rb'))
print('Loaded SALR model')
print({loaded_model_SALR})

loaded_model_MIC = tf.keras.models.load_model('./mental_illness_classification/model.keras')
print('Loaded MIC model')
print({loaded_model_MIC.summary()})

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

lemmatizer = WordNetLemmatizer()
nlp = spacy.load("en_core_web_sm")

def understand_text(text: str) -> str:
    doc = nlp(text)
    tokens = [token.lemma_ for token in doc if not token.is_stop]

    return ' '.join(tokens)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Sentiment Analysis API. Use the /predict endpoint for predictions."

@app.route('/sann-predict', methods=['POST'])
def sann_predict():
    try:
        data = request.json
        if 'input' not in data:
            return jsonify({'error': 'Invalid Input Data'}), 400
        text = data['input']  
        if not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({'error': 'Invalid Input Data'}), 400
        
        text = preprocess_text(text)
        text = remove_stopwords(text)
        max_sequence_length = 23
        tokenizer = tf.keras.preprocessing.text.Tokenizer()
        tokenizer.fit_on_texts([text]) 
        text_seq = tokenizer.texts_to_sequences([text])
        text_padded = tf.keras.preprocessing.sequence.pad_sequences(text_seq, maxlen=max_sequence_length, padding='post', truncating='post')
        prediction = loaded_model_SANN.predict(text_padded)
        prediction_class = prediction.argmax(axis=1)  
        encoder = LabelEncoder()
        prediction_label = encoder.inverse_transform(prediction_class)[0]
        
        return jsonify({'prediction': prediction_label}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/mic-predict', methods=['POST'])
# def mic_predict():
#     try:
#         data = request.json
#         if 'input' not in data:
#             return jsonify({'error': 'Invalid Input Data'}), 400
#         text = data['input']
#         if not isinstance(text, str) or len(text.strip()) == 0:
#             return jsonify({'error': 'Invalid Input Data'}), 400
#         max_sequence_length = loaded_model_MIC.input_shape[1]
#         tokenizer = tf.keras.preprocessing.text.Tokenizer()
#         encoder = LabelEncoder()
#         text = preprocess_text(text)
#         text = remove_stopwords(text)
#         text = understand_text(text)
#         text = tokenizer.texts_to_sequences([text])
#         text = tf.keras.preprocessing.sequence.pad_sequences(text, maxlen=max_sequence_length, padding='post', truncating='post')
#         prediction = loaded_model_MIC.predict(text)
#         prediction = prediction.argmax(axis=1)
#         prediction = encoder.inverse_transform(prediction)[0]
#         return jsonify({'prediction': prediction}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/salr-predict', methods=['POST'])
# def salr_predict():
#     try:
#         data = request.json
#         if 'input' not in data:
#             return jsonify({'error': 'Invalid Input Data'}), 400
#         text = np.array(data['input'])
#         if text.size == 0:
#             return jsonify({'error': 'Invalid Input Data'}), 400
#         vectorizer = TfidfVectorizer()
#         text = preprocess_text(text)
#         text = remove_stopwords(text)
#         text = understand_text(text)
#         text = vectorizer.transform(text)
#         prediction = loaded_model_SALR.predict(text)
#         return jsonify({'prediction': prediction}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)