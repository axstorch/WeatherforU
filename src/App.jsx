import { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, Setlocation] = useState(null);
  const [submit, Setsubmit] = useState(false);
  const [temperature, Settemperature] = useState(null);
  const [humidity, Sethumidity] = useState(null);
  const [wind, Setwind] = useState(null);
  const [weatherCondition, SetweatherCondition] = useState(null);

  const  [error, Seterror] = useState(null);
  const [loading, Setloading] = useState(false);


  useEffect(() => {
    const fetchWeatherData = async () => 
      {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'Oklahoma City',
            appid: 'YOUR_API_KEY',
            units: 'metric'
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [location]);

  const SearchBar = ({data, onSearch}) =>
  {
    

  }



  return (
    <div className="dashboard">
      <div className="glass-card">
        <header>
          <div className="location">
            <span className="city-name">Oklahoma City</span>
            <span className="country">USA</span>
          </div>
          <div className="search-bar">
            {
              <input>
              type = 'text'
              placeholder = 'Search for a city'
              value = {location}
              </input>
            }
          </div>
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

export default WeatherDashboard;