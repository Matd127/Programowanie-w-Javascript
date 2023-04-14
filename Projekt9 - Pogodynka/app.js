let weathers = [];
const weathersMenu = document.querySelector(".weathers");
const findBtn = document.querySelector(".find_btn").addEventListener("click", getWeatherData);
const API_KEY = `c4cb964e4b660ef9aa5765152901bc41`;

const loadWeathers = () => {
  const jsonWeathers = JSON.parse(window.localStorage.getItem("weathers"));
  jsonWeathers ? (weathers = [...jsonWeathers]) : console.log("Brak zapisanej pogody");
};
loadWeathers();

const getDataFromAPI = function (weather, city, operation) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      weather.city = data["name"];
      weather.temp = Math.round(data["main"]["temp"]);
      weather.humidity = data["main"]["humidity"];
      weather.image = data["weather"][0]["icon"];
      weather.wind = data["wind"]["speed"];
      weather.pressure = data["main"]["pressure"];
      weather.temp_min = Math.round(data["main"]["temp_min"]);
      weather.feels_like = Math.round(data["main"]["feels_like"]);
      
      if (operation === "add") {
        weathers.push(weather);
      }
      localStorage.setItem("weathers", JSON.stringify(weathers));
    })
    .then(() => displayWeathers(weathers))
    .catch((err) => console.log(err));
};

function updateWeather() {
  weathers.forEach((weather) => {
    getDataFromAPI(weather, weather.city, "update");
  });
}

function getWeatherData() {
  if (weathers.length === 10) {
    alert("Przekroczono liczbe miejscowości");
  } else {
    const city = document.querySelector(".city");
    const weather = {};
    getDataFromAPI(weather, city.value, "add")
    city.value = ''
  }
}

function displayWeathers(weathers) {
  weathersMenu.textContent = "";

  weathers.forEach((weather, index) => {
    const newWeather = document.createElement("div");
    newWeather.classList.add("weather-field");
    newWeather.innerHTML = `
    <div>${weather.city}</div>
    <div class="temp-info">
      <img src="http://openweathermap.org/img/wn/${weather.image}@2x.png"/>
      <span class="temp">${weather.temp}\xB0C </span>
    </div>
    <div>Wiglotność powietrza: ${weather.humidity}%</div>
    <div>Prędkość wiatru: ${weather.wind} m/s</div>
    <div class="temps"> 
      <div>
        <h3>${weather.temp_min}\xB0C</h3>
        Temperatura minimalna
      </div> 
      <div>
      <h3>${weather.feels_like}\xB0C</h3>
      Temperatura odczuwalna</div> 
    </div>`;

    newWeather.addEventListener("click", () => {
      newWeather.remove();
      weathers.splice(index, 1);
      console.log(index)
      localStorage.setItem("weathers", JSON.stringify(weathers));
    });
    weathersMenu.appendChild(newWeather);
  });
}
displayWeathers(weathers);
window.addEventListener("load", updateWeather);