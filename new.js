// function displayWeather() {
//     const app = document.querySelector(".weather-app");
//     const conditionOutput = document.querySelector(".condition");
//     const nameOutput = document.querySelector(".name");
//     const icon = document.querySelector(".icon");
//     const cloudOutput = document.querySelector(".cloud");
//     const humidityOutput = document.querySelector(".humidity");
//     const windOutput = document.querySelector(".wind");
//     const form = document.querySelector(".locationInput");
//     const btn = document.querySelector(".submit");
//     const cities = document.querySelectorAll(".city");
//     const details = document.querySelector(".details");
//     const searchbox = document.querySelector(".searchbox"); 
    
//     let cityInput = "Tuscumbia";

// //click event on cities
// cities.forEach((city,country) => {
//     city.addEventListener('click', (e) => {
//         //chnages from the default city to the city clicked on
//         cityInput = e.target.innerHTML;
//         // weather API
//         fetchWeatherData(cityInput);
//         app.style.opacity = "0";
//     });
// })
//add submit event to the form
// form.addEventListener('submit', (e) => {
//     if (search.value.length == 0) {
//         alert('Please type a city name');
//     }
//     else {
//         cityInput = search.value;
//         //displays data from weathe API
//         fetchWeatherData();
//         //remove text from input field
//         search.value = "";
//         //fade out the app (simple am=nimation)
//         app.style.opicity = "0";

//     }
//     //prevent the default behaviour of the form
//     e.preventDefault();
// });
//     // click event on cities
//     cities.forEach((city) => {
//       city.addEventListener("click", (e) => {
//         // changes from the default city to the city clicked on
//         const cityInput = e.target.innerHTML;
//         const countryInput = ""; // default country is empty
//         // weather API
//         weather.WeatherFetch(cityInput, countryInput).then(() => {
//           app.style.opacity = "1";
//         });
//       });
//     });
  
    
//   }

let weather = {
    API_KEY: "a1e456013e417b1576aa5725cd9de8bf",
    WeatherFetch: function (city, country) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${this.API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                const { coord } = data;
                const { timezone } = data;
                this.showWeather(data, coord, timezone);
            })
            .catch((error) => {
                console.log("Error fetching weather data:", error);
            });
            submitutton.addEventListener('click', async () => {
                const city = searchInput.value;
                if (city) {
                  const weatherData = await WeatherFetch(city);
                  if (weatherData) {
                    updateWeather(weatherData);
                  }
                }
            });
    },
    showWeather: function (data, coord, timezone) {
        const { name } = data;
        const { country } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { all } = data.clouds;
        const { dt } = data;
    
        console.log(name,country, icon, description, temp, humidity, speed, all, dt, timezone);
    
        document.querySelector(".name").innerText = name;
        document.querySelector(".temp").innerHTML = `${Math.round(temp - 273.15)}&#176`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/w/${icon}.png`;
        document.querySelector(".condition").innerText = description;
        document.querySelector(".humidity").innerText = `${humidity}%`;
        document.querySelector(".wind").innerText = `${speed}km/hr`;
        document.querySelector(".cloud").innerText = `${all}%`;
       
        const date = new Date(dt * 1000);
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        const dateString = date.toLocaleDateString(undefined, options);
    
        const utcTime = new Date((dt + timezone) * 1000);
        const offset = timezone / 3600; // timezone offset in hours
        const localTime = new Date(utcTime.getTime() + offset * 60 * 60 * 1000);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' };
        const timeString = localTime.toLocaleTimeString(undefined, timeOptions);
    
        document.querySelector(".date").innerText = dateString;
        document.querySelector(".time").innerText = timeString;
    
        // Update the time every second
        setInterval(() => {
            const localTime = new Date(utcTime.getTime() + offset * 60 * 60 * 1000);
            const timeString = localTime.toLocaleTimeString(undefined, timeOptions);
            document.querySelector(".time").innerText = timeString;
        }, 1000);
        
    },
    
    search: function () {
        this.WeatherFetch(document.querySelector(".search-box input").value);
    },
};

// Default city when the page loads
let cityInput = "Tuscumbia";

// Fetch data for default city
weather.WeatherFetch(cityInput, "");
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});
document.querySelector(".search-box input").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
weather.WeatherFetch("Tuscumbia", "US");

// Function that returns the day of the week
function dayOfTheWeek(utc) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const date = new Date(utc * 1000);
    return weekday[date.getUTCDay()];
}

displayWeather();
