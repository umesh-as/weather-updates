import React, { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(''); // state to hold the location input value
  const [weatherData, setWeatherData] = useState(null); // state to hold the fetched weather data
  const [error, setError] = useState(''); // state to hold error messages

  // Function to get weather details from the API
  const getWeatherDetails = async () => {
    const apiKey = '5e13945c07aa746e7723d76efc39453f'; // Your OpenWeather API key

    if (location) {
      try {
        // Making a GET request to the OpenWeatherMap API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );

        // Checking if the response is successful
        if (response.status === 200) {
          const data = await response.json();
          setWeatherData(data); // Set the weather data state
          setError(''); // Clear any previous error messages
        } else {
          setWeatherData(null); // Clear any previous weather data
          setError('Please enter a valid location'); // Show an error if the location is invalid
        }
      } catch (err) {
        setWeatherData(null); // Clear any previous weather data
        setError('Error fetching weather data'); // Show an error if there was a network issue
      }
    } else {
      setWeatherData(null); // Clear any previous weather data
      setError('Please enter a location'); // Show an error if no location was entered
    }
  };

  // Helper function to convert UNIX timestamp to readable time format
  const convertToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
   
      <main>
        <div className="main-heading">
          <h1>Weather Updates</h1>
        </div>
  
        <div className="search">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Update location state as the user types
          />
          <button onClick={getWeatherDetails} type="button">
            Search
          </button>
          
        </div>
        
  
        <div id="api">
          {error && <h2>{error}</h2>} {/* Show error message if there's any */}
          {weatherData && (
            <>
              <h1>{weatherData.name}</h1> {/* Display location name */}
              <h2>{weatherData.main.temp}°C</h2> {/* Display temperature */}
              <h3>{weatherData.weather[0].description}</h3> {/* Display weather description */}
              <div className="weather-details">
                <p>Humidity: {weatherData.main.humidity}%</p> {/* Display humidity */}
                <p>Wind Speed: {weatherData.wind.speed} m/s</p> {/* Display wind speed */}
                <p>Pressure: {weatherData.main.pressure} hPa</p> {/* Display pressure */}
                <p>Feels Like: {weatherData.main.feels_like}°C</p> {/* Display feels like temperature */}
                <p>Sunrise: {convertToTime(weatherData.sys.sunrise)}</p> {/* Display sunrise time */}
                <p>Sunset: {convertToTime(weatherData.sys.sunset)}</p> {/* Display sunset time */}
              </div>
            </>
          )}
        </div>
      </main>
   
  );
}

export default App;
