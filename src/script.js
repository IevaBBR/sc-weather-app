function showTime() {
    let now = new Date();
  
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let currentDay = weekdays[now.getDay()];
    let currentHours = now.getHours();
  
    function returnMinutes() {
      let minutes = now.getMinutes();
      if (minutes < 10) {
        return `0${minutes}`;
      } else {
        return minutes;
      }
    }
  
    let currentMinutes = returnMinutes();
  
    let timeBox = document.querySelector("#time");
    timeBox.innerHTML = `Last updated: ${currentDay} ${currentHours}:${currentMinutes}`;
  }
  showTime();


  
  function showWeather(response) {
    celsiusTemperature = response.data.main.temp;

    let temperature = Math.round(celsiusTemperature);
    let outsideTemp = document.querySelector("#temperature");
    outsideTemp.innerHTML = `${temperature}`;
  
    let cityName = document.querySelector("#searched-city");
    cityName.innerHTML = `${response.data.name}`;
  
    let weatherDescription = document.querySelector("#weather-description");
    weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  
    let tempMax = Math.round(response.data.main.temp_max);
    let highTempPh = document.querySelector("#high-temp");
    highTempPh.innerHTML = `${tempMax}°C`;
  
    let tempMin = Math.round(response.data.main.temp_min);
    let lowTempPh = document.querySelector("#low-temp");
    lowTempPh.innerHTML = `${tempMin}°C`;
  
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}%`;
  
    let wind = Math.round(response.data.wind.speed);
    let windPh = document.querySelector("#wind");
    windPh.innerHTML = `${wind} m/s`;
  
    let pressure = document.querySelector("#air-pressure");
    pressure.innerHTML = `${response.data.main.pressure} hPa`;

    let weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIcon.setAttribute("alt", response.data.weather[0].description);
  }
  
  ////////////////////////////////////////////
  // By City Name
  ////////////////////////////////////////////
  
  function retrieveCityWeather(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city");
    let apiKey = "97f8e93f00107773f88eafd933ce86b7";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }
  
  let yourSearch = document.querySelector("form");
  yourSearch.addEventListener("submit", retrieveCityWeather);
  
  ////////////////////////////////////////////
  // By Coordinates
  ////////////////////////////////////////////
  
  function displayTempByCoords(position) {
    let units = "metric";
    let apiKey = "97f8e93f00107773f88eafd933ce86b7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }
  
  function receiveCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(displayTempByCoords);
  }
  
  let findMeButton = document.querySelector("#find-me-button");
  findMeButton.addEventListener("click", receiveCurrentLocation);

  ////////////////////////////////////////////
  // Temperature conversion
  ////////////////////////////////////////////
  
  function showFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureNow = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature*9/5)+32;
    temperatureNow.innerHTML = Math.round(fahrenheitTemperature);
  }

  function showCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureNow = document.querySelector("#temperature");
    temperatureNow.innerHTML = Math.round(celsiusTemperature);
  }

  let celsiusTemperature = null;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemperature);
  

  