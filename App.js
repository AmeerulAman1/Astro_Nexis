import React, { useState } from 'react';
import './App.css';

function App() {
    const [feature1, setFeature1] = useState('');
    const [feature2, setFeature2] = useState('');
    const [prediction, setPrediction] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            feature1: parseFloat(feature1),
            feature2: parseFloat(feature2),
        };

        try {
            const response = await fetch('http://localhost:5001/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setPrediction(`Prediction: ${result.prediction}`);
            setError(null);  // Clear previous errors
        } catch (error) {
            console.error('Error:', error);
            setError('Error: Failed to fetch prediction.');  // Set error message
            setPrediction('');  // Clear previous prediction
        }
    };

    return (
        <div className="App">
            <h1>Weather Prediction App</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Feature 1:
                    <input
                        type="number"
                        value={feature1}
                        onChange={(e) => setFeature1(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Feature 2:
                    <input
                        type="number"
                        value={feature2}
                        onChange={(e) => setFeature2(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Get Weather Prediction</button>
            </form>
            {prediction && <h2>{prediction}</h2>}
            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
        </div>
    );
}

export default App;
