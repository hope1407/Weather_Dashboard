
let zipInput = document.querySelector("#zipInput");
let getWeatherBtn = document.querySelector("#getWeatherBtn")
let results = document.querySelector('.results')
let currentTemp = document.querySelector('#currentTemp');
let currentWind = document.querySelector('#currentWind')
let currentHumidity = document.querySelector('#currentHumidity')
let tomTemp = document.querySelector('#currentDay1')
let previousSearches = document.querySelector(".previousSearches")
let recentSearches = document.querySelector("#searches")
let forecastZeroTemp = document.querySelector("#forecastZeroTemp")
let forecastOneTemp = document.querySelector("#forecastOneTemp")
let forecastTwoTemp = document.querySelector("#forecastTwoTemp")
let forecastThreeTemp = document.querySelector("#forecastThreeTemp")
let forecastFourTemp = document.querySelector("#forecastFourTemp")
let forecastZeroWind = document.querySelector("#forecastZeroWind")
let forecastOneWind = document.querySelector("#forecastOneWind")
let forecastTwoWind = document.querySelector("#forecastTwoWind")
let forecastThreeWind = document.querySelector("#forecastThreeWind")
let forecastFourWind = document.querySelector("#forecastFourWind")
let forecastZeroHumidity = document.querySelector("#forecastZeroHumidity")
let forecastOneHumidity = document.querySelector("#forecastOneHumidity")
let forecastTwoHumidity = document.querySelector("#forecastTwoHumidity")
let forecastThreeHumidity = document.querySelector("#forecastThreeHumidity")
let forecastFourHumidity = document.querySelector("#forecastFourHumidity")
let forecastZeroUv = document.querySelector("#forecastZeroUv")
let forecastOneUv = document.querySelector("#forecastOneUv")
let forecastTwoUv = document.querySelector("#forecastTwoUv")
let forecastThreeUv = document.querySelector("#forecastThreeUv")
let forecastFourUv = document.querySelector("#forecastFourUv")
let forecastZeroDate = document.querySelector("#forecastZeroDate")
let forecastOneDate = document.querySelector("#forecastOneDate")
let forecastTwoDate = document.querySelector("#forecastTwoDate")
let forecastThreeDate = document.querySelector("#forecastThreeDate")
let forecastFourDate = document.querySelector("#forecastFourDate")

let dateTime = luxon.DateTime;
let dt = dateTime.now();
let today = dateTime.local().toLocaleString(dateTime.DATE_HUGE);
let date = document.querySelector("#currentDay");
date.textContent = today;

var zipSubmitHandler = function (event) {
    event.preventDefault();
    var zipCode = zipInput.value;

    if (zipCode) {
        getWeather(zipCode);
        results.style.display = "block";
        previousSearches.style.display = 'block';
        zipInput.value = '';
    } else {
        alert('Please enter a valid zip');
    }

}
var entry = JSON.parse(localStorage.getItem("entry"))
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
            cityName = data.name
            currentTemp.textContent = "Temp: " + data.main.temp;
            currentWind.textContent = "Wind: " + data.wind.speed + " MPH";
            currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
            let searchBtn = document.createElement('button')
            let newContent = document.createTextNode(cityName)
            searchBtn.appendChild(newContent)
            document.body.insertBefore(searchBtn,results);
            /*entry.push({
                "city" : data.name,
                "zip" : zipCode
            });
            localStorage.setItem("entry", JSON.stringify(entry))
            console.log(localStorage)*/
            getForecast(latitude, longitude);
        })
}


function getForecast(latitude, longitude) {
    let secondUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=aa549204eace54c9a130ca02cb68afc8'
    fetch(secondUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Fetch Response \n-----------');
            console.log(data)
            forecastZeroDate.textContent = dateTime.now().plus({ days: 1 }).toLocaleString(dateTime.DATE_HUGE);
            forecastOneDate.textContent = dateTime.now().plus({ days: 2 }).toLocaleString(dateTime.DATE_HUGE);
            forecastTwoDate.textContent = dateTime.now().plus({ days: 3 }).toLocaleString(dateTime.DATE_HUGE);
            forecastThreeDate.textContent = dateTime.now().plus({ days: 4 }).toLocaleString(dateTime.DATE_HUGE);
            forecastFourDate.textContent = dateTime.now().plus({ days: 5 }).toLocaleString(dateTime.DATE_HUGE);
            currentUv.textContent = "UV Index: " + data.current.uvi;
            forecastZeroTemp.textContent = "Temp: " + data.daily[1].temp.max
            forecastOneTemp.textContent = "Temp: " + data.daily[2].temp.max
            forecastTwoTemp.textContent = "Temp: " + data.daily[3].temp.max
            forecastThreeTemp.textContent = "Temp: " + data.daily[4].temp.max
            forecastFourTemp.textContent = "Temp: " + data.daily[5].temp.max
            forecastZeroWind.textContent = "Wind: " + data.daily[1].wind_speed + " MPH";
            forecastOneWind.textContent = "Wind: " + data.daily[2].wind_speed + " MPH";
            forecastTwoWind.textContent = "Wind: " + data.daily[3].wind_speed + " MPH";
            forecastThreeWind.textContent = "Wind: " + data.daily[4].wind_speed + " MPH";
            forecastFourWind.textContent = "Wind: " + data.daily[5].wind_speed + " MPH";
            forecastZeroHumidity.textContent = "Humidity: " + data.daily[1].humidity + "%";
            forecastOneHumidity.textContent = "Humidity: " + data.daily[2].humidity + "%";
            forecastTwoHumidity.textContent = "Humidity: " + data.daily[3].humidity + "%";
            forecastThreeHumidity.textContent = "Humidity: " + data.daily[4].humidity + "%";
            forecastFourHumidity.textContent = "Humidity: " + data.daily[5].humidity + "%";
            forecastZeroUv.textContent = "UV Index: " + data.daily[1].uvi
            forecastOneUv.textContent = "UV Index: " + data.daily[2].uvi
            forecastTwoUv.textContent = "UV Index: " + data.daily[3].uvi
            forecastThreeUv.textContent = "UV Index: " + data.daily[4].uvi
            forecastFourUv.textContent = "UV Index: " + data.daily[5].uvi
        })
    
}

getWeatherBtn.addEventListener("click", zipSubmitHandler)