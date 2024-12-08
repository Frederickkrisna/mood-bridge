import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
import tensorflow as tf
import re
from string import punctuation
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Mental Illness Classification API. Use the /mic-predict endpoint for predictions."

@app.route('/mic-predict', methods=['POST'])
def mic_predict():
    try:
        res = []
        data = request.json
        if 'input' not in data:
            return jsonify({'error': 'Invalid Input Data'}), 400
        text = data['input']
        if not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({'error': 'Invalid Input Data'}), 400
        text = preprocess_text(text)
        max_sequence_length = 100
        tokenizer = tf.keras.preprocessing.text.Tokenizer()
        tokenizer.fit_on_texts([text])
        text = tokenizer.texts_to_sequences([text])
        text = tf.keras.preprocessing.sequence.pad_sequences(text, maxlen=max_sequence_length, padding='post', truncating='post')
        prediction = loaded_model_MIC.predict(text)
        for i in range(len(prediction[0])):
            num = float(prediction[0][i])
            res.append(num)
        return jsonify({'prediction': res}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)