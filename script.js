// Replace with your OpenWeatherMap API Key
const API_KEY = 'fb753a190d650defd15002f9586f15e3';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const tempElement = document.getElementById('temp');
const descElement = document.getElementById('weather-desc');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

// Search Event Listener
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

// Location Button Event Listener
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            error => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve location');
            }
        );
    }
});

// Fetch Weather by City Name
async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data');
    }
}

// Fetch Weather by Coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data');
    }
}

// Update Weather UI
function updateWeatherUI(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    descElement.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed;
    
    // Update Weather Icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Default Weather on Page Load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('London'); // Default city
});
