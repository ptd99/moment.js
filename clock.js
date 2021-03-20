const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");
const timesetBtn = clockContainer.querySelector("i");
let timeset = true; // if true -> 24 hours false-> 12 hours

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const hours_12 = hours%12;
    if(timeset)
    {clockTitle.innerHTML = 
    `${hours}:${(minutes<10)?'0'+minutes:minutes}:${(seconds<10)?'0'+seconds:seconds}`;
    }  
    else
    {clockTitle.innerHTML = 
    `${(hours_12<10)?'0'+hours_12:hours_12}:${(minutes<10)?'0'+minutes:minutes}:${(seconds<10)?'0'+seconds:seconds}`;}
}

function timesetHandler(){
    timeset = !timeset;
}

function init() {
    
    getTime();
    timesetBtn.addEventListener("click", timesetHandler)
    setInterval(getTime, 200);
    
}
init();