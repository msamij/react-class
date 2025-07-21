import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchCity, setSearchCity] = useState('');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        const apiKey = 'f4eac041959d4d299c025852252107'; // Replace with your WeatherAPI key
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();

        if (data.error) {
          setWeather(null);
          setError(data.error.message);
        } else {
          setWeather(data);
          setError('');
        }
      } catch (err) {
        setWeather(null);
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeather();
  }, [city]);

  const handleSubmit = e => {
    e.preventDefault();
    if (searchCity.trim() !== '') {
      setCity(searchCity.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Weather App 🌦️</h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={searchCity}
            onChange={e => setSearchCity(e.target.value)}
            className="flex-1 p-2 rounded border border-gray-300 focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>

        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        {weather && (
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-4xl mt-2">{weather.current.temp_c}°C</p>
            <p className="capitalize text-gray-600 mt-1">{weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="weather icon" className="mx-auto mt-2" />
            <p className="text-sm mt-2 text-gray-500">
              Wind: {weather.current.wind_kph} kph | Humidity: {weather.current.humidity}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
