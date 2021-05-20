
let zipInput = document.querySelector("#zipInput");
let getWeatherBtn = document.querySelector("#getWeatherBtn")
let results = document.querySelector('.results')
let currentTemp = document.querySelector('#currentTemp');
let currentWind = document.querySelector('#currentWind')
let currentHumidity = document.querySelector('#currentHumidity')
let tomTemp = document.querySelector('#currentDay1')

const DateTime = luxon.DateTime;
let today = DateTime.local().toLocaleString(DateTime.DATE_HUGE);
let date = document.querySelector("#currentDay");
date.textContent = today;

var zipSubmitHandler = function (event) {
    event.preventDefault();
    results.style.display = "block"
    var zipCode = zipInput.value;

    if (zipCode) {
        getWeather(zipCode);


        zipInput.value = '';
    } else {
        alert('Please enter a valid zip');
    }
}

let getWeather = function (zipCode) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial&appid=aa549204eace54c9a130ca02cb68afc8'
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-----------');
            console.log(data);
            let latitude = data.coord.lat
            let longitude = data.coord.lon
            city.textContent = data.name
            currentTemp.textContent = "Temp: " + data.main.temp;
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            getForecast(latitude, longitude);
        })
}

function getForecast(latitude, longitude){
    let secondUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=aa549204eace54c9a130ca02cb68afc8'
    fetch(secondUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log('Fetch Response \n-----------');
        console.log(data);
        //tomTemp.textContent = data.daily[1].temp.max
        currentUv.textContent = "UV Index: " + data.current.uvi;

    })
}
getWeatherBtn.addEventListener("click", zipSubmitHandler)