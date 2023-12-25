function updateWeather(response) {
  let temperature = document.querySelector("#temp-value");
  let city_elt = document.querySelector("#city");
  let desc_elt = document.querySelector("#weather-desc");
  let humidity_elt = document.querySelector("#humidity");
  let windspeed_elt = document.querySelector("#wind-speed");
  let time_elt = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  console.log(response.data);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon">`;
  city_elt.innerHTML = response.data.city;
  time_elt.innerHTML = dateFormat(date);
  temperature.innerHTML = Math.round(response.data.temperature.current);
  desc_elt.innerHTML = response.data.condition.description;
  humidity_elt.innerHTML = `${response.data.temperature.humidity}%`;
  windspeed_elt.innerHTML = `${Math.round(response.data.wind.speed)}km/hr`;
}

function dateFormat(date) {
  let mins = date.getMinutes();
  let hrs = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day = days[date.getDay()];
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let dt = date.getDate();
  let month = months[date.getMonth()];

  return `${day} ${month} ${dt} ${date.getFullYear()}, ${hrs}:${mins}`;
}

function searchCity(city) {
  let apiKey = `893fc75a240abbc6oc34eddd57f08bta`;
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(updateWeather);
}

function search(event) {
  event.preventDefault();
  let search_input = document.querySelector("#search-input");
  searchCity(search_input.value);
}
let form_elt = document.querySelector("#search-form");
form_elt.addEventListener("submit", search);

function forecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";
  days.forEach(function (day) {
    let forecast = document.querySelector("#forescast");
    forecastHtml += `
    <div class="forecast-day">
      <div class="forecast-date">${day}</div>
        <div class="icon">🌥️</div>
          <div class="forecast-temp">
            <span class="max-temp">
              <strong>12°</strong>
            </span>
            <span class="min-temp">10°</span>
      </div>
    </div>
 `;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

searchCity("Addis Ababa");
forecast();
