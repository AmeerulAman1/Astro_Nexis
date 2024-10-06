const express = require('express');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors()); // Enable CORS for all requests

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Weather Prediction API!');
});

app.post('/api/weather', async (req, res) => {
  try {
    const { location } = req.body;
    const model = await load_model();  // Load your .pkl model here
    const prediction = model.predict(location); // Use model for prediction logic
    res.status(200).json({ prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching prediction.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
