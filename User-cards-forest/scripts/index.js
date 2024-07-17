const todosContainer = document.querySelector(".todosContainer");
const userIdSearch = document.getElementById("userIdSearch");

async function getAllTodos() {
  try {
    const response = await fetch("https://dummyjson.com/todos");
    const allTodos = await response.json();
    return allTodos.todos;
  } catch (error) {
    console.log(error);
  }
}

async function renderTodos() {
  const todosList = await getAllTodos();

  todosList.forEach((elTodo) => {
    const todoElement = document.createElement("li");
    todosContainer.appendChild(todoElement);

    const userIdSpan = document.createElement("span");
    const todoText = document.createElement("span");
    const statusSpan = document.createElement("span");

    userIdSpan.textContent = `User ID: ${elTodo.userId}`;
    todoText.textContent = `Todo: ${elTodo.todo}`;
    statusSpan.textContent = `Status: ${
      elTodo.completed ? "Completed" : "Pending"
    }`;

    userIdSpan.classList.add("user-id");
    todoText.classList.add("todo-text");
    statusSpan.classList.add("status");

    todoElement.appendChild(userIdSpan);
    todoElement.appendChild(todoText);
    todoElement.appendChild(statusSpan);
  });
}

function searchTodosById() {
  const userId = userIdSearch.value;
  const todoItems = document.querySelectorAll("li");

  todoItems.forEach((item, index) => {
    const userIdSpan = item.querySelector(".user-id").textContent;
    if (userIdSpan.includes(`User ID: ${userId}`)) {
      item.remove();
      todosContainer.insertBefore(item, todosContainer.firstChild);
      item.classList.remove("blur");

      item.classList.add("animate-up");

      // Remove animation class after animation is complete
      setTimeout(() => {
        item.classList.remove("animate-up");
      }, 500); // Adjust duration as needed
    } else {
      item.classList.add("blur");
    }
  });
}

userIdSearch.addEventListener("input", searchTodosById);

renderTodos();
