import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "a3a2325f06c657296bb6565f0f1ab80d";
  const [weatherData, setWeatherData] = useState([{}]);
  const [zipcode, setCity] = useState("");
  const time = new Date().toDateString();

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        });
    }
  };
  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter zip code"
        onChange={(e) => setCity(e.target.value)}
        value={zipcode}
        onKeyPress={getWeather}
      />
      <div className="button1">
      </div>

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p className="centered">
            Welcome to the weather app. Enter your zipcode and hit enter
          </p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="smalldata">{time}</p>
          <p className="city">{weatherData.name}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
          <p className="temp">{Math.round(weatherData.main.temp)}F</p>
          <p className="weather">{weatherData.weather[0].main}</p>
          <p className="smalldata">Feels like: {weatherData.main.feels_like}</p>
          <p className="smalldata">
            Min Temperature:{weatherData.main.temp_min}
          </p>
          <p className="smalldata">
            Max Temperature: {weatherData.main.temp_max}
          </p>
          <p className="smalldata">Humidity: {weatherData.main.humidity}</p>
          
        </div>
      )}
    </div>
  );
}

export default App;
