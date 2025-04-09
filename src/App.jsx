import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './assets/SearchBar';
import './App.css'
import { DarkModeSwitch } from 'react-toggle-dark-mode';


function Weather() {

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [iconUrl, setIconUrl] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherDescr, setWeatherDescr] = useState(null);
  const [iconCode, setIconCode] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location, API_KEY]);

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', JSON.stringify(checked));
    document.body.classList.toggle('dark-mode', checked);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);


  useEffect(() => {
    if (!weatherCode) return;

    let imageUrl = '';

    if (weatherCode >= 200 && weatherCode <= 232) {
      import('./assets/Images/thunderstorm.jpg')
        .then((module) => {
          const imageUrl = module.default;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    }

    else if (weatherCode >= 500 && weatherCode <= 531) {
      import('./assets/Images/rainy.jpg')
        .then((module) => {
          const imageUrl = module.default;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    }

    else if (weatherCode >= 600 && weatherCode <= 622) {
      import('./assets/Images/snowy.jpg')
        .then((module) => {
          const imageUrl = module.default;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    }
    else if (weatherCode === 800) {
      import('./assets/Images/clear.jpg')
        .then((module) => {
          const imageUrl = module.default;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    }

    else if (weatherCode === 721) {
      import('./assets/Images/haze.jpg')
        .then((module) => {
          const imageUrl = module.default;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    }

    else if (weatherCode > 800 && weatherCode <= 804) {
      import('./assets/Images/Cloudy.jpg')
        .then((module) => {
          const imageUrl = module.default;
          document.body.style.backgroundImage = `url(${imageUrl})`;
        });
    }

  }, [weatherCode]);

  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const updateSearchHistory = (searchdata) => {
    const filteredHistory = searchHistory.filter(item => item !== searchdata);

    const newHistory = [searchdata, ...filteredHistory];

    const limitedHistory = newHistory.slice(0, 5);

    setSearchHistory(limitedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
  };

  const handleRefresh = () => {
    if (location) {
      fetchWeatherData(location);
    }
    console.log('Refresh button clicked');
  };

  const fetchWeatherData = async (location) => {
    if (!location) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);

      setTemperature(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setWind(response.data.wind.speed);
      setWeatherDescr(response.data.weather[0].description);
      setWeatherCode(response.data.weather[0].id);

      const iconCode = response.data.weather[0].icon;
      setIconCode(iconCode);
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      setIconUrl(iconUrl);


    } catch (error) {
      alert('Please recheck the spelling');
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleOnSearchChange = (searchdata) => {
    setLocation(searchdata);
    updateSearchHistory(searchdata);
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
        <div className="dark-mode-toggle">
          <DarkModeSwitch
            checked={darkMode}
            onChange={toggleDarkMode}
            size={24}
            moonColor="#f5f5f5"
            sunColor="#f5f5f5" />
        </div>
        <button className="refresh-button" onClick={handleRefresh} type="button">
          refresh
        </button>


        <div className="search-history">
          {searchHistory.length > 0 && (
            <>
              <h3>Recent Searches:</h3>
              <div className="history-buttons">
                {searchHistory.map((item, index) => (
                  <button
                    key={item + index}
                    className="history-button"
                    onClick={() => handleOnSearchChange(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>


        <div className="main-content">
          <div className="left-panel">
            <div className="temperature-display">
              <h1> temperature: {temperature}°C</h1>
            </div>
            <div className="weatherIcon">
              <img src={iconUrl} alt="Weather Icon" />
            </div>
            <div className="weather-description">
              <h2>Weather: {weatherDescr}</h2>
            </div>
            <div className="humidity">Humidity: {humidity}%</div>
            <div className="wind">
              <span>Wind speed: {wind} Km/hr
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Weather;