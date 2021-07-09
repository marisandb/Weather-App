var searchFormEl = document.querySelector("#search-form");
var citySearchEl = document.querySelector("#city-search");
var cityConEl = document.querySelector("#city-con");
var searchedCity = document.querySelector("#searched-city");
var btn = document.querySelector("#btn");


var searchForm = function(event) {
    event.preventDefault();
    // get value from input element
var citySearch = citySearchEl.value.trim();

if (citySearch) {
  getCityData(citySearch);
  citySearchEl.value = "";
} else {
  alert("Please enter a city");
}
    console.log(event);
  };


var getCityData = function(name) {
    // format the github api url
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=imperial&APPID=d19133dc0a20a28e3b61dea237b3f849";
  
    // make a request to the url
    fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayCityData(data, name);
      });
    } else {
      alert('Error: City not found');
    }
  })
  .catch(function(error) {
    alert("Failed to connect");
  });
}

var displayCityData = function(name, searchTerm) {
    console.log(name);
    console.log(searchTerm);
    // clear old content
  cityConEl.textContent = "";
  searchedCity.textContent = searchTerm;
};

searchFormEl.addEventListener("submit", searchForm);
btn.addEventListener("click", searchForm);