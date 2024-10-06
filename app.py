import pickle
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load your trained model correctly
with open('random_forest_model.pkl', 'rb') as model_file:  # Correctly opening the .pkl file
    model = pickle.load(model_file)
print("Model loaded successfully!")

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from the frontend
        data = request.json
        feature1 = data['feature1']
        feature2 = data['feature2']

        # Create a DataFrame from input data
        input_data = pd.DataFrame({
            'Feature1': [feature1],
            'Feature2': [feature2]
        })

        # Make a prediction using the model
        prediction = model.predict(input_data)

        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
