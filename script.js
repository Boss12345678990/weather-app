
const cityform = document.querySelector("form");
const cityinput = document.querySelector(".cityinput");
const weather = document.querySelector(".weather");
const apiKey = "dd1768926c14c99f09e541a7071554de";
document.addEventListener('DOMContentLoaded', function() {
  
    cityinput.addEventListener('blur', function() {
      if (cityinput.value === '') {
        cityinput.placeholder = 'Enter a city';
      }
    });
  
    cityinput.addEventListener('focus', function() {
      cityinput.placeholder = '';
    });
  });

cityform.addEventListener("submit", async event =>{
    event.preventDefault()
    const city = cityinput.value;

    if(city){
        const data = await getweather(city);
        console.log(data);
        updateUI(data);
    }
    else{
        console.log("please enter a valid city name");
    }

})


async function getweather(city){
    const base = "https://api.openweathermap.org/data/2.5/weather";
    const query = `?q=${city}&appid=${apiKey}`;
    const response = await fetch(base + query);
    if (response.ok){
        const data = await response.json();
        return data;
    }
    else{
        throw new Error('Weather data could not be fetched');
    }
    return data;
}
function updateUI(data){
    const {main: {temp, humidity}, 
            name: city_name, 
            weather:[{main, id}], wind: {speed} } = data;
    weather.innerHTML = `
        <h2 class="weather_icon">${getweatherIcon(id)}</h2>
        <h2 class="city_name">${city_name}</h2>
        <p class="temperature">${(temp - 273.15).toFixed(2)}°C</p>
        
        <p class="humidity">Humidity: ${humidity}%</p>
        <p class="wind">Wind speed: ${speed} m/s</p>`;
    
}

function getweatherIcon(weatherid){
    switch(true){
        case(weatherid >= 200 && weatherid < 300):
            return "⛈";
        case(weatherid >= 300 && weatherid < 400):
            return "🌨";
        case(weatherid >= 400 && weatherid < 500):
            return "🌧";
        case(weatherid >= 500 && weatherid < 600):
            return "❄";
        case(weatherid >= 700 && weatherid < 800):
            return "🌫";
        case(weatherid === 800):
            return "☀";
        case(weatherid > 800):
            return "☁";
    }
}





