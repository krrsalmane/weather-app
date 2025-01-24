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

 

  