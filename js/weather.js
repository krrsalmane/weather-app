document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "4d44a6dcc4e01fd655d15da56deda2ff";

  // Select elements
  const searchInput = document.getElementById("city-input");
  const searchButton = document.getElementById("search-button");
  const dayEl = document.getElementById("day-name");
  const dateEl = document.getElementById("current-date");
  const locationEl = document.getElementById("location-name");
  const weatherIconEl = document.getElementById("weather-icon");
  const temperatureEl = document.getElementById("temperature");
  const descriptionEl = document.getElementById("weather-description");
  const forecastEl = document.getElementById("weekly-forecast");

  // Function to fetch weather data
  function fetchWeather(city) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    // Fetch current weather
    fetch(weatherURL)
      .then((response) => response.json())
      .then((data) => updateCurrentWeather(data))
      .catch(() => alert("City not found"));

    // Fetch forecast
    fetch(forecastURL)
      .then((response) => response.json())
      .then((data) => updateForecast(data))
      .catch(() => alert("Forecast not available"));
  }

  // Update current weather
  function updateCurrentWeather(data) {
    const today = new Date();
    dayEl.textContent = today.toLocaleDateString("en-US", { weekday: "long" });
    dateEl.textContent = today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionEl.textContent = capitalize(data.weather[0].description);
    weatherIconEl.textContent = getIcon(data.weather[0].icon);
  }

 