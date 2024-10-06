from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load('random_forest_model.pkl')

@app.route('/')
def home():
    return "Welcome to the Weather Prediction API!"

@app.route('/predict-weather', methods=['POST'])
def predict():
    data = request.get_json()
    if 'features' not in data:
        return jsonify({'error': 'No features provided!'}), 400

    try:
        # Extract features from the request and convert them to numpy array
        features = np.array(data['features']).reshape(1, -1)
        # Make prediction using the loaded model
        prediction = model.predict(features)
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
