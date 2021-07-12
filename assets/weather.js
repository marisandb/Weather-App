var searchFormEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");
var btn = document.querySelector("#btn");

var saveSearchArr = []

function searchForm(event) {
    event.preventDefault();
    // get value from input element
var citySearch = citySearchEl.value.trim();

if (citySearch) {
  getCityData(citySearch);
  citySearch.value = "";
} else {
  alert("Please enter a city");
}
    searchFormEl.reset();
    console.log(event);
  };

function getCityData(name) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=imperial&appid=d19133dc0a20a28e3b61dea237b3f849`)
  .then(response =>{
      return response.json()
  })
  .then(data =>{
    console.log(data)
    let lat = data.coord.lat
    let lon = data.coord.lon
    var weathercode = data.weather[0].icon
    var icon = document.getElementById("icon")
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weathercode}@2x.png` )
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=d19133dc0a20a28e3b61dea237b3f849`)
        .then(response =>{
            return response.json()
        })
        .then(data =>{
            fiveDayForecast(data)
            
            // Create a new JavaScript Date object based on the timestamp
            let unix_timestamp = data.current.dt
            var date = new Date(unix_timestamp * 1000);
            console.log(date)
            var currentDate = Intl.DateTimeFormat("en-US").format(date)
            console.log(Intl.DateTimeFormat("en-US").format(date))
            
            // Creates Current Weather Display
            document.querySelector("#city").textContent = "" + name + " ( " + currentDate +" ) ";
            document.querySelector("#temp").innerHTML = "Temperature: " + data.current.temp + "&#8457";
            document.querySelector("#wind").textContent = "Wind Speed: " + data.current.wind_speed + "MPH";
            document.querySelector("#humidity").textContent = "Humidity: " + data.current.humidity + "%";
            document.querySelector("#uv").textContent = "UV Index: " + data.current.uvi;

            //saveSearch(city)
            //loadSavedSearches()
        })
        .catch(function(error) {
          alert("Failed to connect");
        })
      })
    }

 // save search to localStorage
// function saveSearch(event){
//   event.preventDefault();
//   var saveSearched = citySearchEl.value.trim();

//   var cityObj = {
//     cityName: saveSearched
//   }

//   if (localStorage.getItem("cityList")) {
//     saveSearchArr = JSON.parse(localStorage.getItem("cityList"))
// }
// saveSearchArr.push(cityObj)

// localStorage.setItem("cityList", JSON.stringify(saveSearchArr))
// localStorage.setItem("cityName", saveSearched)
// }

// // get searches from localStorage
// function loadSavedSearches(){
//   var displayCity = JSON.parse(localStorage.getItem("cityList"))
//   for (let i = 0; i < 10; i++) {
//       const city = displayCity[i].cityName
//       var cityCon = document.querySelector(".search-history")
//       var cityButton = document.createElement("button")
//       cityButton.classList = "city-button"
//       cityButton.setAttribute("id", city)
//       cityButton.textContent = city
//       cityCon.append(cityButton)
//   }
// }

// loadSavedSearches();

function fiveDayForecast(data) {
    $('.forecast-container').empty()
    for(let i = 0; i < 5; i++) {
        rendersForecast(data.daily[i])
    }
}

function rendersForecast(singleDayOfData) {
  let stamp = singleDayOfData.dt
  const when = new Date(stamp * 1000)
  const date = Intl.DateTimeFormat("en-US").format(when)
  const look = singleDayOfData.weather[0].icon
  const temp = singleDayOfData.temp.day
  const wind = singleDayOfData.wind_speed
  const humidity = singleDayOfData.humidity

  // create cards for each of the 5-day forcast weather
  const card = `<div class="column col s12 m6 l2">
  <div class= "card">
      <div>
          <ul class="list-group list-group-flush">
              <h5 class="list-group-item date">${date}</h5>
              <img class="list-group-item weather-icon" src="http://openweathermap.org/img/wn/${look}@2x.png" alt="">
              <li class="list-group-item temp">Temp: ${temp}&#8457</li>
              <li class="list-group-item wind">Wind: ${wind} MPH</li>
              <li class="list-group-item humidity">Humidity: ${humidity}%</li>
          </ul>
      </div>  
  </div>
  </div>`;
  $('.forecast-container').append(card)
}

searchFormEl.addEventListener("submit", searchForm)
btn.addEventListener("click", searchForm)

// Click on Previous Searched buttons
$(document).on('click', '.city-button', function(event) {
  event.preventDefault();
  var cityText = $(this)
  .text()
  .trim();

  citySearchEl.setAttribute("value", cityText)
  searchForm(event);
  saveSearch(city);
})
