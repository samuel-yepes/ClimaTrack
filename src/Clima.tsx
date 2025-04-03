import React, { useState } from 'react';
import axios from 'axios';

interface DatosClima {
  main: {temp: number; 
    humidity: number;
  };

  weather: Array<{descripcion: string; icon: string;}>;

  name: string;
}

const Weather: React.FC = () => {
  const [ciudad, setCity] = useState<string>('');
  const [clima, setTiempo] = useState<DatosClima | null>(null);
  const [error, setError] = useState<string>('');

  const api = '67d78960913ba9f2f8a2e093105e564a';
  const llamaApi = async () => {
    if (!ciudad) return;
    setError('');
    try {
      const response = await axios.get<DatosClima>(`https://api.openweathermap.org/data/2.5/weather?id=ciudad&appid=67d78960913ba9f2f8a2e093105e564a`, {
        params: {
          q: ciudad,
          appid: api,
          units: 'metric', //grados
        },
      });
      setTiempo(response.data);
    } catch (err) {
      setError('Lo siento, el clima no se pudo obtener');
      setTiempo(null);
    }
  };

  return (
    <div className='container'>
      <h1>Clima de la Ciudad</h1>
      <input type="text"
        value={ciudad}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Ingresa el nombre de la ciudad"
      />
      <button onClick={llamaApi}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {clima && (
        <div className='container-text'>
          <h2>{clima.name}</h2>
          <p>Temperatura: {clima.main.temp} °C</p>
          <p>Descripción: {clima.weather[0].descripcion}</p>
          <p>Humedad: {clima.main.humidity}%</p>
          <img src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}
            alt={clima.weather[0].descripcion}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;