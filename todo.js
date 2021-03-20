const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const lists = document.querySelector(".js-lists");
const toDoList = lists.querySelector(".js-toDoList");
const doneList = lists.querySelector(".js-doneList");
const TODOS_LS = 'toDos';
const DONES_LS = 'dones';

let toDos = [];
let dones = [];

function undoHandler(event){
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const originalId = parseInt(li.id);
    const text = dones.find((x) => x.id === originalId).text;
    const cleanDones = dones.filter(function (toDo) {
        return toDo.id !== originalId;
      });

    dones = cleanDones;
    paintToDo(text);
}

function doneHandler(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const originalId = parseInt(li.id);
    const text = toDos.find((x) => x.id === originalId).text;
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== originalId;
      });

    toDos = cleanToDos;
    paintDone(text);

}
function deleteDones(event){
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const cleanDones = dones.filter(function(toDo)
    {
        return toDo.id !== parseInt(li.id);
    });
    dones = cleanDones;
    saveToDos();

}
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo)
    {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();

}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(DONES_LS, JSON.stringify(dones));
}

function paintDone(text){
    const li = document.createElement("li");
    const dot = document.createElement("i");
    const undoBtn = document.createElement("i");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    let newId = toDos.length + 1;
    dones.forEach(function (toDo) {
        if (toDo.id === newId) {
          newId = newId + 1;
        }
      });

    dot.className = "fas fa-caret-right fa-3x";
    delBtn.className = "fas fa-times";
    undoBtn.className = "fas fa-undo";
    delBtn.addEventListener("click",deleteDones);
    undoBtn.addEventListener("click",undoHandler);
    span.innerText = text;
    li.appendChild(dot);
    li.appendChild(span);
    li.appendChild(undoBtn);
    li.appendChild(delBtn);
    li.id = newId;
    doneList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    dones.push(toDoObj);
    saveToDos();
}


function paintToDo(text){
    const li = document.createElement("li");
    const dot = document.createElement("i");
    const doneBtn = document.createElement("i");
    const delBtn = document.createElement("i");
    const span = document.createElement("span");
    let newId = toDos.length + 1;
    toDos.forEach(function (toDo) {
        if (toDo.id === newId) {
          newId = newId + 1;
        }
    });
    dot.className = "fas fa-caret-right fa-3x";
    delBtn.className = "fas fa-times";
    doneBtn.className = "fas fa-check";
    delBtn.addEventListener("click",deleteToDo);
    doneBtn.addEventListener("click",doneHandler);
    span.innerText = text;
    li.appendChild(dot);
    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";

}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedDones = localStorage.getItem(DONES_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
    }
    if(loadedDones !== null){
        const parsedDones = JSON.parse(loadedDones);
        parsedDones.forEach(function(toDo){
            paintDone(toDo.text);

        });
    }
    
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
