import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const apiKey = '67d78960913ba9f2f8a2e093105e564a'; // Sustituye esto por tu API Key

  const handleSearch = async () => {
    if (!city) return;
    setError('');
    try {
      const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric', // Para obtener la temperatura en grados Celsius
        },
      });
      setWeather(response.data);
    } catch (err) {
      setError('No se pudo obtener el clima de esa ciudad');
      setWeather(null);
    }
  };

  return (
    <div>
      <h1>Clima de la Ciudad</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa el nombre de la ciudad"
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp} °C</p>
          <p>Descripción: {weather.weather[0].description}</p>
          <p>Humedad: {weather.main.humidity}%</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
