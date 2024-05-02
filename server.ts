const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_KEY = '6a6c9047962c68300572aea1aa2487b6';

app.get('/weather', async (req, res) => {
  const { city } = req.query;
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const weatherData = {
        weather: `${weatherDescription}. Temperature: ${temperature}°C`
      };
      res.json(weatherData);
    } else {
      res.status(response.status).json({ error: data.message || 'Failed to fetch weather data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
