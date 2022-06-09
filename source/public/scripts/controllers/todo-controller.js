import TodoService from "../services/todo-service.js";
import OrderService from "../services/todo-order-service.js";

const todoService = new TodoService();
const orderService = new OrderService();

class TodoController {
  constructor() {
    this.bodyHTML = document.querySelector("body");
    this.todoContainer = document.querySelector("#todo-app-container");
    this.toogleStyleBtn = document.querySelector(".style-btn");

    this.todosFromDB = [];
  }

  eventHandlers() {
    this.toogleStyleBtn.addEventListener("click", () => {
      this.bodyHTML.classList.toggle("dark-mode");
    });
    /** **START FILTER AND SORT HANDLERS ********** */
    this.sortByNameBtn.addEventListener("click", () => {
      this.loadData();
      this.todosFromDB = orderService.sortTodos(this.todosFromDB, "title");
      this.showTodos(this.todosFromDB);
      this.eventHandlers();
    });

    this.sortByImportanceBtn.addEventListener("click", () => {
      this.loadData();
      this.todosFromDB = orderService.sortTodos(this.todosFromDB, "importance");
      this.showTodos(this.todosFromDB);
      this.eventHandlers();
    });

    this.sortByDueDateBtn.addEventListener("click", () => {
      this.loadData();
      this.todosFromDB = orderService.sortTodos(this.todosFromDB, "dueDate");
      this.showTodos(this.todosFromDB);
      this.eventHandlers();
    });

    this.sortByCreationBtn.addEventListener("click", () => {
      this.loadData();
      this.todosFromDB = orderService.sortTodos(this.todosFromDB, "creation");
      this.showTodos(this.todosFromDB);
      this.eventHandlers();
    });

    this.todoFilterSelectElement.addEventListener("change", (event) => {
      if (event.target.value === "all") {
        this.loadData();
        this.showTodos(this.todosFromDB);
        this.eventHandlers();
      } else if (event.target.value === "finished") {
        this.loadData();
        this.todosFromDB = orderService.filterTodos(
          this.todosFromDB,
          "finished"
        );
        this.showTodos(this.todosFromDB);
        this.eventHandlers();
      } else if (event.target.value === "unfinished") {
        this.loadData();
        this.todosFromDB = orderService.filterTodos(
          this.todosFromDB,
          "unfinished"
        );
        this.showTodos(this.todosFromDB);
        this.eventHandlers();
      }
    });

    /** ********END FILTERING AND SORTING **************** */

    this.addNewTodoButtonElemet.addEventListener("click", (event) => {
      event.preventDefault();
      this.showTodosForm();
      this.addTodoCreateButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const newTodo = {
          title: this.todoTitle.value,
          description: this.todoDescription.value,
          importance: this.todoImportance.value,
          dueDate: this.todoDueDate.value,
          finishedState: this.todoFinishedState.checked,
        };
        const result = await todoService.addTodo(newTodo);
        return result;
      });
      this.addTodoOverviewButton.addEventListener("click", async (e) => {
        e.preventDefault();
        this.initialize();
      });
    });

    this.todoEditBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", async (event) => {
        const editBtnId = event.target.dataset.editId;
        const todo = await todoService.getTodoById(editBtnId);
        this.showTodosForm(todo);

        this.addTodoOverviewButton.addEventListener("click", async (e) => {
          e.preventDefault();
          this.initialize();
        });

        this.addTodoUpdateAndOverviewButton.addEventListener(
          "click",
          async (e) => {
            e.preventDefault();
            const updatedTodo = {
              title: this.todoTitle.value,
              description: this.todoDescription.value,
              importance: this.todoImportance.value,
              dueDate: this.todoDueDate.value,
              finishedState: this.todoFinishedState.checked ,
            };
            await todoService.updateTodo(editBtnId, updatedTodo);
            this.initialize();

          }
        );
      });
    });

    this.todoDeleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (e) => {
        await todoService.deleteTodo(e.target.dataset.deleteId);
        this.initialize();
      });
    });
  }

  showTodos(pData) {
    const filterMenu = `
                    <section class="filter-bar">
                        <button class="sort-by-name">Name</button>
                        <button class="sort-by-due-date">By Due Date</button>
                        <button class="sort-by-creation">By Creation Date</button>
                        <button class="sort-by-importance">By Importance</button>
                        <select class="todo-filter-select">
                            <option value="list" selected >Choose <> </option>
                            <option value="all">All Todo List <> </option>
                            <option value="finished">Finished <></option>
                            <option value="unfinished">Unfinished <></option>
                        </select>
                    </section>
        `;
    const todoList = `
                <section class="todo-list">
                    ${pData
                      .map(
                        (todo) => `
                    <div class="todo-item">
                        <div class="remaining-time">${this.calculateRemainingDay(
                          todo.createdAt,
                          todo.dueDate
                        )}</div>
                        <div class="description">${todo.title}</div>
                        <div class="importance">${this.importanceSymbole(
                          todo.importance
                        )}</div>
                        <button data-edit-id="${
                          todo.id
                        }" class="todo-edit-btn">Edit</button>
                        <div>
                            <input
                            type="checkbox"
                            id="list-todo-finishedState"
                            name="finishedState"
                            ${todo.finishedState ? "checked" : ""}
                            />
                            <label for="list-todo-finishedState">Finished</label>                            
                        </div>
                        <div class="todo-description">${todo.description}</div>
                        <div class="todo-date">${this.dateFormatter(todo.dueDate)}</div>
                        <button data-delete-id ="${
                          todo.id
                        }" class="todo-delete-btn">Delete</button>
                        </div>
                        `
                      )
                      .join("")}
                        <button id="create-btn" class="create-btn">+</button>
                    </div>
                </section>
        `;

    const todosView = `
                ${filterMenu}
                ${todoList}
        `;
    this.todoContainer.innerHTML = todosView;
    this.addNewTodoButtonElemet = document.querySelector("#create-btn");
    this.sortByNameBtn = document.querySelector(".sort-by-name");
    this.sortByImportanceBtn = document.querySelector(".sort-by-importance");
    this.sortByDueDateBtn = document.querySelector(".sort-by-due-date");
    this.sortByCreationBtn = document.querySelector(".sort-by-creation");
    this.todoFilterSelectElement = document.querySelector(
      ".todo-filter-select"
    );
    this.todoEditBtns = document.querySelectorAll(".todo-edit-btn");
    this.todoDeleteBtns = document.querySelectorAll(".todo-delete-btn");
  }

  /** ***going to move into utils */


  dateFormatter(pDate){
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = (new Date(pDate)).toLocaleString('de-DE', options)
    return formattedDate
  }


  calculateRemainingDay(pCreatedDate, pDueDate) {
    const diffInMs = new Date(pDueDate) - new Date(pCreatedDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) {
      return "Time over";
    }
    if (diffInDays == 1) {
      return "in a day";
    }
    return `in ${diffInDays.toFixed()} days`;
  }

  importanceSymbole(importanceCaunt) {
    let symbole = "";
    for (let index = 1; index <= importanceCaunt; index++) {
      symbole += "⚠️";
    }
    return symbole;
  }

  showTodosForm(_pEditTodo = []) {
    const todoForm = `
                <section class="form-container">
                    <h1 class="page -title">Add Todo</h1>
                    <form>
                        <div>
                        <label for="add-todo-title" required >Title</label>
                        <input id="add-todo-title" name="add-todo-title" type="text" placeholder="${
                          _pEditTodo.title ?? ""
                        }"/>
                        </div>
                        <div>
                        <label for="add-todo-importance">Importance</label>
                        <select id="add-todo-importance" name="add-todo-importance">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        </div>
                        <div>
                            <label for="add-todo-due-date">Due Date</label>
                            <input id="add-todo-due-date" name="add-todo-due-date" type="date">
                        </div>
                        <div>
                            <input type="checkbox" id="add-todo-finishState" name="add-todo-finishState">
                            <label for="add-todo-finishState">Finished ?</label>
                        </div>
                        <div>
                        <label for="add-todo-description">Description</label>
                        <textarea id="add-todo-description" name="add-todo-description" placeholder="${
                          _pEditTodo.description ?? ""
                        }"></textarea>
                        </div>
                        <div class="add-todo-buttons">
                        <button class="add-todo-create-button">Create</button>
                        <button class="add-todo-update-overview-button">Update and Overview</button>
                        <button class="add-todo-overview-button">Overview</button>
                        </div>
                    </form>
                </section>    
                    `;

    this.todoContainer.innerHTML = todoForm;
    this.addTodoCreateButton = document.querySelector(
      ".add-todo-create-button"
    );
    this.addTodoOverviewButton = document.querySelector(
      ".add-todo-overview-button"
    );
    this.addTodoUpdateAndOverviewButton = document.querySelector(
      ".add-todo-update-overview-button"
    );
    this.todoTitle = document.querySelector("#add-todo-title");
    this.todoDescription = document.querySelector("#add-todo-description");
    this.todoImportance = document.querySelector("#add-todo-importance");
    this.todoDueDate = document.querySelector("#add-todo-due-date");
    this.todoFinishedState = document.querySelector("#add-todo-finishState");
  }

  async loadData() {
    this.todosFromDB = await todoService.getAllTodos();
  }

  initialize() {
    this.loadData().then(() => {
      this.showTodos(this.todosFromDB);
      this.eventHandlers();
    });
  }
}

new TodoController().initialize();
