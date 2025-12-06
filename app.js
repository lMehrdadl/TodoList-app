const addButton = document.querySelector(".addButton");
const editButton = document.querySelector(".editButton");
const todoInput = document.querySelector(".todo");
const dateInput = document.querySelector("#date");
const table = document.querySelector(".tasksTable");
const alerts = document.querySelector(".alerts");
const clearButton = document.querySelector("#delete");
const tableBody = document.querySelector("tbody");
const filterBtn = document.querySelectorAll(".filter-btn");

let todoInfo = JSON.parse(localStorage.getItem("todos")) || [];

const idGenerator = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15)
  ).toString();
};

const saveToLocal = () => {
  localStorage.setItem("todos", JSON.stringify(todoInfo));
};

const showAlert = (message, type) => {
  alerts.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add(`alert-${type}`);
  alerts.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 1500);
};

const addTodoHandler = (data) => {
  const todoList = data || todoInfo;
  tableBody.innerHTML = "";
  if (!todoList.length) {
    tableBody.innerHTML = "<tr><td colspan='4'>No task found</td></tr>";
  } else {
    todoList.forEach((todo) => {
      tableBody.innerHTML += `
        <tr>
          <td>${todo.task}</td>
          <td>${todo.date || "No date"}</td>
          <td>${todo.completed ? "Completed" : "Pending"}</td>
          <td>
            <button class="todo-button edit-btn" onclick = "editHandler(${
              todo.id
            })">Edit</Button>
            <button class="todo-button do-btn" onclick="doHandler(${
              todo.id
            })">${todo.completed ? "Undo" : "Do"}</Button>
            <button class="todo-button delete-btn" onclick="deleteHndler('${
              todo.id
            }')" >Delete</Button>
          </td>
        </tr>
      `;
    });
  }
};

const clearAllHandler = () => {
  if (todoInfo.length) {
    todoInfo = [];
    saveToLocal();
    addTodoHandler();
    showAlert("All todos cleared successfully!", "success");
  } else {
    showAlert("No todos to clear!", "error");
  }
};

const addHandler = () => {
  const task = todoInput.value;
  const date = dateInput.value;
  const todo = {
    id: idGenerator(),
    completed: false,
    task,
    date,
  };
  if (task) {
    todoInfo.push(todo);
    saveToLocal();
    addTodoHandler();
    todoInput.value = "";
    dateInput.value = "";
    showAlert("Todo added successfully!", "success");
  } else {
    showAlert("Please enter a task!", "error");
  }
};

const deleteHndler = (id) => {
  const newTodo = todoInfo.filter((todo) => todo.id !== id);
  todoInfo = newTodo;
  saveToLocal();
  addTodoHandler();
  showAlert("Todo deleted successfully!", "success");
};

const doHandler = (id) => {
  const todo = todoInfo.find((todo) => todo.id === id.toString());
  todo.completed = !todo.completed;
  saveToLocal();
  addTodoHandler();
  showAlert("Todo added successfully", "success");
};

const editHandler = (id) => {
  const todo = todoInfo.find((todo) => todo.id === id.toString());
  todoInput.value = todo.task;
  dateInput.value = todo.date;
  addButton.style.display = "none";
  editButton.style.display = "inline-block";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const todo = todoInfo.find((todo) => todo.id === id);
  todo.task = todoInput.value;
  todo.date = dateInput.value;
  todoInput.value = "";
  dateInput.value = "";
  saveToLocal();
  addTodoHandler();
  showAlert("Todo edited successfully", "success");
  addButton.style.display = "inline-block";
  editButton.style.display = "none";
};

const filterHandler = (event) => {
  let filteredTodos = null;
  const filter = event.target.dataset.filter;
  switch (filter) {
    case "pending":
      filteredTodos = todoInfo.filter((todo) => todo.completed === false);  
      break;

    case "completed":
      filteredTodos = todoInfo.filter((todo) => todo.completed === true);
      break;

    default:
      filteredTodos = todoInfo;
      break;
  }
  addTodoHandler(filteredTodos)
};

window.addEventListener("load", () => addTodoHandler());
addButton.addEventListener("click", addHandler);
clearButton.addEventListener("click", clearAllHandler);
editButton.addEventListener("click", applyEditHandler);
filterBtn.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
