import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<string>('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await response.json();
      if (response.ok) {
        setWeather(data.weather);
      } else {
        console.error('Failed to fetch weather data:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching weather data:', (error as Error).message || 'Unknown error');
    }
  };

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
      <button onClick={fetchWeather}>Get Weather</button>
      <p className="weather-info">{weather}</p>
    </div>
  );
};

export default App;
