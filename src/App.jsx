import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './assets/SearchBar';

function Weather() {

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherCondition, SetWeatherCondition] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location, API_KEY]);


  const fetchWeatherData = async (location) => {
    if (!location) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      // Set other state variables from response.data
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };


  const handleOnSearchChange = (searchdata) => {
    setLocation(searchdata);
  };

  return (
    <div className="dashboard">
      <div className="glass-card">
        <header>
          <div className="location">
            <span className="city-name">{location}</span>
          </div>
          <SearchBar onSearch={handleOnSearchChange} />
        </header>

        <div className="main-content">
          <div className="left-panel">
            <div className="temperature-display">
              <h1>20°</h1>
              <span className="variation">±3</span>
            </div>
            <div className="humidity">9.8%</div>
            <div className="wind">
              <span>Wind: WSW 6mph</span>
            </div>
            <div className="risk-indicator">
              <div className="safe">
                <span>0.00% - 0.9%</span>
                <span>0.9% - 11%</span>
              </div>
              <div className="dangerous">
                <span>12% - 38%</span>
                <span>39% - 90%</span>
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="weather-forecast">
              <h2>Storm with Heavy Rain</h2>
              <div className="forecast-details">
                <span>USA, Friday, Jan 3, 2023, 8:45AM</span>
                <p>Variable clouds with snow showers. High 11F. Winds E at 10 to 20 mph. Chance of snow 50%. Snow accumulations less than one inch.</p>
              </div>
              <div className="temperature-details">17°</div>
            </div>
          </div>
        </div>

        <div className="temperature-graph">
          {/* Implement chart using react-chartjs-2 */}
        </div>

        <div className="cities-comparison">
          <div className="city">
            <span className="temp">20°</span>
            <span className="name">Washington D.C.</span>
          </div>
          <div className="city">
            <span className="temp">17°</span>
            <span className="name">Oklahoma City</span>
          </div>
          {/* More cities */}
        </div>
      </div>
    </div>
  );

}

export default Weather;