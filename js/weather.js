document.addEventListener("DOMContentLoaded", function () {
  // API key for the weather data
  var API_KEY = "4d44a6dcc4e01fd655d15da56deda2ff";

  // Select elements from the DOM
  var searchInput = document.getElementById("city-input");
  var searchButton = document.getElementById("search-button");
  var dayEl = document.getElementById("day-name");
  var dateEl = document.getElementById("current-date");
  var locationEl = document.getElementById("location-name");
  var weatherIconEl = document.getElementById("weather-icon");
  var temperatureEl = document.getElementById("temperature");
  var descriptionEl = document.getElementById("weather-description");
  var forecastEl = document.getElementById("weekly-forecast");

  // Function to fetch weather data
  function fetchWeather(city) {
    var weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      API_KEY;
    var forecastURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=metric&appid=" +
      API_KEY;

    // Fetch current weather
    fetch(weatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        updateCurrentWeather(data);
      })
      .catch(function () {
        alert("City not found");
      });

    // Fetch forecast
    fetch(forecastURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        updateForecast(data);
      })
      .catch(function () {
        alert("Forecast not available");
      });
  }

  // Function to update the current weather
  function updateCurrentWeather(data) {
    var today = new Date();
    dayEl.textContent = today.toLocaleDateString("en-US", { weekday: "long" });
    dateEl.textContent = today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    locationEl.textContent = data.name + ", " + data.sys.country;
    temperatureEl.textContent = Math.round(data.main.temp) + "°C";
    descriptionEl.textContent = capitalize(data.weather[0].description);
    weatherIconEl.textContent = getIcon(data.weather[0].icon);
  }

  // Function to update the forecast for the week
  function updateForecast(data) {
    forecastEl.innerHTML = ""; // Clear previous forecast

    var forecasts = [];
    for (var i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.includes("12:00:00")) {
        forecasts.push(data.list[i]);
      }
    }

    // Only show the first 5 days
    for (var j = 0; j < 5; j++) {
      var forecast = forecasts[j];
      var date = new Date(forecast.dt_txt);
      var dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      var temp = Math.round(forecast.main.temp) + "°C";
      var icon = getIcon(forecast.weather[0].icon);

      // Build forecast HTML
      var forecastHTML =
        '<div class="day-forecast text-center">' +
        '<div class="day-name text-gray-400">' +
        dayName +
        "</div>" +
        '<div class="weather-icon mt-2">' +
        icon +
        "</div>" +
        '<div class="temperature text-lg mt-2">' +
        temp +
        "</div>" +
        "</div>";

      forecastEl.innerHTML += forecastHTML;
    }
  }

  // Function to get weather icons
  function getIcon(iconCode) {
    var icons = {
      "01d": "☀️",
      "01n": "🌕",
      "02d": "⛅",
      "02n": "🌥️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };

    if (icons[iconCode]) {
      return icons[iconCode];
    } else {
      return "❓";
    }
  }

  // Function to capitalize the first letter of a string
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Add event listener for the search button
  searchButton.addEventListener("click", function () {
    var city = searchInput.value.trim();
    if (city === "") {
      alert("Please enter a city name");
    } else {
      fetchWeather(city);
    }
  });

  // Load the weather for a default city
  fetchWeather("beni mellal");
});
