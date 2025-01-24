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

  // Update forecast
  function updateForecast(data) {
    forecastEl.innerHTML = "";
    const forecasts = data.list.filter((item) => item.dt_txt.includes("12:00:00")).slice(0, 5);

    forecasts.forEach(function (forecast) {
      const date = new Date(forecast.dt_txt);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = `${Math.round(forecast.main.temp)}°C`;
      const icon = getIcon(forecast.weather[0].icon);

      const forecastHTML = `
        <div class="day-forecast text-center">
          <div class="day-name text-gray-400">${dayName}</div>
          <div class="weather-icon mt-2">${icon}</div>
          <div class="temperature text-lg mt-2">${temp}</div>
        </div>`;
      forecastEl.innerHTML += forecastHTML;
    });
  }

  // Get weather icon
  function getIcon(iconCode) {
    const icons = {
      "01d": "☀️", "01n": "🌕",
      "02d": "⛅", "02n": "🌥️",
      "03d": "☁️", "03n": "☁️",
      "04d": "☁️", "04n": "☁️",
      "09d": "🌧️", "09n": "🌧️",
      "10d": "🌦️", "10n": "🌧️",
      "11d": "⛈️", "11n": "⛈️",
      "13d": "❄️", "13n": "❄️",
      "50d": "🌫️", "50n": "🌫️",
    };
    return icons[iconCode] || "❓";
  }

  