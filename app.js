const addButton = document.querySelector(".addButton");
const todoInput = document.querySelector(".todo");
const dateInput = document.querySelector("#date");
const table = document.querySelector(".tasksTable")
const tableRow = document.createElement("tr")
const tableData = document.createElement("td")
const addAlert = document.querySelector(".add")


const showTodo = () => {
  const todo = todoInput.value;
  console.log(todo)
};

const showDate = () => {
  const date = dateInput.value;
  console.log(date)
};

const addRow = () => {
    table.appendChild(tableRow)
    tableRow.appendChild(tableData)
    tableRow.appendChild(tableData)
    tableRow.appendChild(tableData)
    tableRow.appendChild(tableData)
    tableData.className = "tdStyle"
}

const addMessage = ()=> {
    addAlert.style.display = "flex"
    table.style.marginTop = "10px"
}

// addButton.addEventListener("click", showTodo);
// addButton.addEventListener("click", showDate);
addButton.addEventListener("click", addRow);
addButton.addEventListener("click", addMessage);



