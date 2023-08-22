// Function that fetches weather data from the OpenWeatherMap API
function WeatherFetch(city, country) {
    const API_KEY = "a1e456013e417b1576aa5725cd9de8bf";
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
    ).then((response) => response.json());
}

// Function that updates the weather display with data from the API
function updateWeather(data) {
    const { name, weather, main, wind, clouds, dt, timezone } = data;
    const { country } = data;
    const { icon, description } = weather[0];
    const { temp, humidity, pressure, temp_min, temp_max } = main;
    const { speed } = wind;
    const { all } = clouds;
    

    const date = new Date(dt * 1000);
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const dateString = date.toLocaleDateString(undefined, options);

    // Update the weather display
    document.querySelector(".name").innerText = name;
    document.querySelector(".temp").innerHTML = `${Math.round(temp)}°c`;
    document.querySelector(".icon").src = `https://openweathermap.org/img/w/${icon}.png`;
    document.querySelector(".condition").innerText = description;
    document.querySelector(".humidity").innerText = `${humidity}%`;
    document.querySelector(".wind").innerText = `${speed}km/hr`;
    document.querySelector(".cloud").innerText = `${all}%`;
    document.querySelector(".pressure").innerText = `${pressure}mb`;
    document.querySelector(".max_temp").innerText = `${temp_max}°C `;
    document.querySelector(".min_temp").innerText = `${temp_min}°C `;

    document.querySelector(".date").innerText = dateString;
    document.querySelector(".time").innerText = timeString;
    document.backgroundImage="url('https://source.unsplash.com/1600x900/?'"+ name +"')"
   
}

// Function that fetches and updates weather data for a given city and country that is entered
function fetchAndUpdateWeather(city, country) {
    WeatherFetch(city, country)
        .then((data) => {
            updateWeather(data);
        })
        .catch((error) => {
            console.log("Error fetching weather data:", error);
        });
}

// Default city of the page
let defaultCity = "Tuscumbia";

// Fetch data for default city
fetchAndUpdateWeather(defaultCity, "");

// Event listener for search button click
window.onload = function() {
    setTimeout(function() {
      // Your code here
      document.querySelector(".submit").addEventListener("click", function () {
        const city = document.querySelector(".search").value;
        if (city) {
          fetchAndUpdateWeather(city, "");
        }
      });
    }, 2000); 
  };
  

// Event listener for search input enter key press
setTimeout(function() {
    document.querySelector(".search").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            const city = document.querySelector(".search").value;
            if (city) {
                fetchAndUpdateWeather(city, "");
            }
            else{
                alert("Please enter a city or a country name")
            }
        }
    });
}, 2000); 



