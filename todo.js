// 아래와 같이 작성할경우, clock.js 의 상수(cost)와 충돌함
// 충돌을 피하면서 아래와 같이 짤려면 독립적인 모듈을 짜야함
// const form = document.querySelector(".js-toDoForm");
// const toDoInput = form.querySelector("input");
const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function filterFn(toDo) {
  return toDo.id === 1;
}

function deleteToDo(event) {
  // Delete HTML
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  // Delete data
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  // Basically js save data as string type in localStorage
  // JSON.stringify() : Change object to string
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  span.innerText = "■ " + text;
  span.style.cssText = `color: white`;
  delBtn.innerText = "❌";
  delBtn.style.cssText = `
  background-color: rgba(0, 0, 0, 0);
  border: none;
  `;
  delBtn.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function HandleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function LoadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // JSON.parse() : Change string to object
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  LoadToDos();
  toDoForm.addEventListener("submit", HandleSubmit);
}
init();
