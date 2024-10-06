import React, { useState } from 'react';

const WeatherPrediction = () => {
    const [inputData, setInputData] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleInputChange = (event) => {
        setInputData(event.target.value); // Update input data based on user input
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataArray = inputData.split(',').map(item => parseFloat(item.trim())); // Split input into an array of numbers

        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataArray), // Send the input data to the backend
        });
        
        if (response.ok) {
            const result = await response.json();
            setPrediction(result.prediction); // Update prediction with the response
        } else {
            console.error('Error fetching prediction');
        }
    };

    return (
        <div className="WeatherPrediction">
            <h2>Weather Prediction</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter features (comma separated)"
                    value={inputData}
                    onChange={handleInputChange}
                />
                <button type="submit">Predict</button>
            </form>
            {prediction && <div>Prediction: {prediction}</div>}
        </div>
    );
};

export default WeatherPrediction;
