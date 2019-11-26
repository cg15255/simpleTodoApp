// Selectors
//===============================

const addTodoBtn = document.querySelector(".add-todo");
const overlay = document.querySelector(".overlay");
const addTodoModalBtn = document.querySelector(".add-todo--modal");
const addTodoInput = document.querySelector("#todoItem");
const todoList = document.getElementById("todoList");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const form = document.querySelector("form");
let todos = ["Buy cat food", "Get a haircut", "Buy stamps"];

// Functions
//===============================
function openOverlay() {
  overlay.classList.add("overlay--visible");
  addTodoBtn.classList.add("add-todo--disabled");
  addTodoInput.focus();
}

function handleOverlayClick(e) {
  if (e.target.classList.contains("overlay")) {
    closeOverlay();
  }
}

function closeOverlay() {
  overlay.classList.remove("overlay--visible");
  addTodoBtn.classList.remove("add-todo--disabled");
}

function handleKeyPress() {
  if (addTodoInput.value === "") {
    if (addTodoModalBtn.classList.contains("add-todo--modal-active")) {
      addTodoModalBtn.classList.remove("add-todo--modal-active");
      addTodoModalBtn.disabled = true;
    }
    return;
  } else {
    addTodoModalBtn.classList.add("add-todo--modal-active");
    addTodoModalBtn.disabled = false;
  }
}

function buildTodoList(todos) {
  const html = todos
    .map(todo => `<li><input type="checkbox" />${todo}</li>`)
    .join("");
  todoList.innerHTML = html;
}

function addTodoItem(e) {
  e.preventDefault();
  if (addTodoInput.value !== "") {
    todos.push(addTodoInput.value);
    buildTodoList(todos);
    closeOverlay();
    form.reset();
    setLocalStorageTodos(todos);
  }
}

function handleCheckboxClick(e, i) {
  console.log("checked");
}

function handleRemoveClick(e) {
  if (e.target.parentNode.parentNode.id !== "todoList") {
    return;
  }
  const todoItem = e.target.nextSibling.textContent;
  const updatedTodos = todos.filter(todo => todo !== todoItem);
  todos = [...updatedTodos];
  buildTodoList(todos);
  setLocalStorageTodos(todos);
}

function getLocalStorageTodos() {
  if (localStorage.getItem("todos")) {
    todos = [...JSON.parse(localStorage.getItem("todos"))];
  }
}

function setLocalStorageTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

getLocalStorageTodos();
buildTodoList(todos);

// Event Listeners
//===============================

addTodoBtn.addEventListener("click", openOverlay);
overlay.addEventListener("click", handleOverlayClick);
window.addEventListener("keyup", handleKeyPress);
form.addEventListener("submit", addTodoItem);
todoList.addEventListener("click", handleRemoveClick);
