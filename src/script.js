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

  function formatForecastDay(timestamp) {
    let date = new Date(timestamp*1000);
    let day =  date.getDay();
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    return days[day];

  }

  function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#five-day-forecast");
    
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
    
    let forecastHTML = `<div class="row justify-content-center">`;
    forecast.forEach(function(forecastDay, index) {
      if (index > 0 && index < 7) {
      forecastHTML = forecastHTML + 
      `
        <div class="col-2">
          <div class="weekday">${formatForecastDay(forecastDay.dt)}</div>
          <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt=${forecastDay.weather[0].description} 
            class="forecast-icon"
          >
          <div>
            <span class="temperature-high">${Math.round(forecastDay.temp.max)}°</span>
            <span> | </span>
            <span class="temperature-low">${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
      `;} 
    })

    forecastHTML = forecastHTML + `</div>`

    forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
    let apiKey = "97f8e93f00107773f88eafd933ce86b7";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
  }



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

    getForecast(response.data.coord);
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


  


  