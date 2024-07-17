const splitButtonClickHandler = (target) => {
  const splitButton = document.querySelector(".split-button");
  [...splitButton.children].forEach((element) =>
    element.classList.remove("split-button__button--active")
  );
  target.classList.add("split-button__button--active");
  filterTodos();
};

const getTodos = () => {
  const localStorageTodos = JSON.parse(localStorage.getItem("todosStorage"));
  return localStorageTodos;
};

const filterTodos = () => {
  const localStorageTodos = getTodos();
  const filterStatus = document
    .querySelector(".split-button__button--active")
    .id.replace("filter-", "");
  const searchTerm = document.querySelector("#searchInput").value.toLowerCase();

  let filteredTodos = localStorageTodos
    .filter((todo) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active" && !todo.done) return true;
      if (filterStatus === "done" && todo.done) return true;
      return false;
    })
    .filter((todo) => {
      return todo.description.toLowerCase().includes(searchTerm);
    });

  renderTodos(filteredTodos);
};

const renderTodos = (todos = getTodos()) => {
  const container = document.querySelector("#todo-list");
  container.innerHTML = "";

  if (todos && Array.isArray(todos)) {
    todos.forEach((todo) => {
      const startDate = new Date(todo.startDate).toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
      });
      const id = todo.id;
      container.insertAdjacentHTML(
        "beforeend",
        `
              <li class="todo-block">
                <label class="checkbox" for="${id}" onclick="toggleTodoDone('${id}')">
                  <input type="checkbox" name="${id}" id="${id}" ${
          todo.done ? "checked" : ""
        }/>
                  <span class="material-symbols-rounded checkbox__check-icon">
                    check
                  </span>
                </label>
                <div class="todo-block__data">
                  <p class="todo-block__date">${startDate}</p>
                  <h3 class="todo-block__title">${todo.description}</h3>
                </div>
                <span class="material-symbols-rounded todo-list__remove" onclick="deleteTodo('${id}')">
                  close
                </span>
              </li> `
      );
    });
  }
};

const createTodo = (e) => {
  e.preventDefault();
  const startDate = document.querySelector("#startDate").value;
  const description = document.querySelector("#description").value;

  const localStorageTodos = getTodos();

  const newTodo = {
    id: "todo_" + Math.random().toString(16).slice(2),
    createdAt: new Date(),
    startDate,
    description,
    done: false,
  };

  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    localStorageTodos.push(newTodo);
    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  } else {
    localStorage.setItem("todosStorage", JSON.stringify([newTodo]));
  }
  renderTodos();
};

const toggleTodoDone = (todoId) => {
  const localStorageTodos = getTodos();
  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    const todoIndex = localStorageTodos.findIndex((todo) => todo.id === todoId);
    localStorageTodos[todoIndex].done = !localStorageTodos[todoIndex].done;

    localStorage.setItem("todosStorage", JSON.stringify(localStorageTodos));
  }

  renderTodos();
};

const deleteTodo = (todoId) => {
  const localStorageTodos = getTodos();

  if (localStorageTodos && Array.isArray(localStorageTodos)) {
    const newTodos = localStorageTodos.filter((todo) => todo.id !== todoId);
    localStorage.setItem("todosStorage", JSON.stringify(newTodos));
  }
  renderTodos();
};

document.querySelector("#create-form").addEventListener("submit", (e) => {
  e.preventDefault();
  createTodo(e);
});

document.querySelector("#searchInput").addEventListener("input", filterTodos);

renderTodos();
