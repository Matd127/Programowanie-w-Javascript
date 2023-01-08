function getWeatherData() {
  const API_KEY = `c4cb964e4b660ef9aa5765152901bc41`;
  const weather = {};
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${'Warszawa'}&units=metric&appid=${API_KEY}`
  ).then((res) => res.json())
  .then(data => {
    console.log(data)
  });
}
getWeatherData();

