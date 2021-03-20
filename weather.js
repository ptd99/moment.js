const API_KEY = "aefd6352e0016162ba5b9b77b0b2cafe";
const COORDS = 'coords';
const weatherForm = document.querySelector(".js-weatherform");
const weather = weatherForm.querySelector(".js-weather");
const btn = weatherForm.querySelector(".fas");
let celFah = false; // true->Celsius, false->Fahrenheit

function getWeather(lat,long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json();}
    ).then(function(json){
    console.log(json);
    celFah = !celFah;
    const temperature = json.main.temp;
    const place = json.name;
    const fahTemp = (temperature*1.8) + 32;
    const fahTemperature = fahTemp.toFixed(2);

    if(celFah){
    weather.innerHTML = `${temperature}°C @ ${place}`;
    }
    else{
    weather.innerHTML = `${fahTemperature}°F @ ${place}`;
    }
            
    });

}
   



function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}
function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
    
}
function handleGeoError(){
    console.log("Can't access geo loacation")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();

    }
    else {
      const parseCoords = JSON.parse(loadedCoords);
      getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}


function init(){
    loadCoords();
    btn.addEventListener("click",loadCoords);
}

init();
