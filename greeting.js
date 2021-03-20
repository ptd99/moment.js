const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greetForm = document.querySelector(".js-greetform");

const USER_LS = "currentUser", 
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}
function handleReset(){
    const greeting = greetForm.querySelector(".js-greetings");
    const reset = greetForm.querySelector("i");
    localStorage.removeItem(USER_LS);
    form.classList.add(SHOWING_CN);
    greeting.remove();
    greetForm.removeChild(reset);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}
function paintGreeting(text){
    const greeting = document.createElement("span");
    greeting.className = "js-greetings"
    form.classList.remove(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
    const reset = document.createElement("i");
    reset.className = "fas fa-times";
    reset.addEventListener("click", handleReset);
    greetForm.appendChild(greeting);
    greetForm.appendChild(reset);

}
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else {
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();
