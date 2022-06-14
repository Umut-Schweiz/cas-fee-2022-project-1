import TodoService from "../services/todo-service.js";
import OrderService from "../services/todo-order-service.js";
import TodoListView from "../views/todo-list-view.js";
import TodoFormView from "../views/todo-form-view.js";

export default class TodoController {
  constructor() {
    this.todoService = new TodoService();
    this.orderService = new OrderService();

    this.todoListView = new TodoListView();
    this.todoFormView = new TodoFormView();
    this.bodyHTML = document.querySelector("body");
    this.todoContainer = document.querySelector("#todo-app-container");
    this.toogleStyleBtn = document.querySelector(".style-btn");
    this.todosFromDB = [];
  }

  switchStyle() {
    this.toogleStyleBtn.addEventListener("click", () => {
      this.bodyHTML.classList.toggle("dark-mode");
    });
  }

  eventHandlers() {
    /* START FILTER AND SORT HANDLERS */
    this.sortByNameBtn.addEventListener("click", async () => {
      this.loadData();
      const sortedData = await this.orderService.sortTodos(
        this.todosFromDB,
        "title"
      );
      this.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.sortByImportanceBtn.addEventListener("click", () => {
      this.loadData();
      const sortedData = this.orderService.sortTodos(
        this.todosFromDB,
        "importance"
      );
      this.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.sortByDueDateBtn.addEventListener("click", () => {
      this.loadData();
      const sortedData = this.orderService.sortTodos(
        this.todosFromDB,
        "dueDate"
      );
      this.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.sortByCreationBtn.addEventListener("click", () => {
      this.loadData();
      const sortedData = this.orderService.sortTodos(
        this.todosFromDB,
        "creation"
      );
      this.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.todoFilterSelectElement.addEventListener("change", (event) => {
      if (event.target.value === "all") {
        this.loadData();
        this.renderTodosView(this.todosFromDB);
        this.eventHandlers();
      } else if (event.target.value === "finished") {
        this.loadData();
        const filteredTodos = this.orderService.filterTodos(
          this.todosFromDB,
          "finished"
        );
        this.renderTodosView(filteredTodos);
        this.eventHandlers();
      } else if (event.target.value === "unfinished") {
        this.loadData();
        const filteredTodos = this.orderService.filterTodos(
          this.todosFromDB,
          "unfinished"
        );
        this.renderTodosView(filteredTodos);
        this.eventHandlers();
      }
    });
    /* END FILTERING AND SORTING */

    this.addNewTodoButtonElemet.addEventListener("click", (event) => {
      event.preventDefault();
      this.renderTodoForm();
      this.addTodoCreateButton.addEventListener("click", async (e) => {
        e.preventDefault();
        if(!this.todoTitle.checkValidity()){
          this.todoTitle.setAttribute("placeholder", this.todoTitle.validationMessage);
        }else if(!this.todoDescription.checkValidity()){
          this.todoDescription.setAttribute("placeholder", this.todoDescription.validationMessage)
        }else {
          const newTodo = {
            title: this.todoTitle.value,
            description: this.todoDescription.value,
            importance: this.todoImportance.value,
            dueDate: this.todoDueDate.value,
            finishedState: this.todoFinishedState.checked,
          };
          const result = await this.todoService.addTodo(newTodo);
          return result;
        }
        
      });
      this.addTodoOverviewButton.addEventListener("click", async (e) => {
        e.preventDefault();
        // this.renderTodosView(this.todosFromDB);
        this.initialize();
      });
    });

    this.todoEditBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", async (event) => {
        const editBtnId = event.target.dataset.editId;
        const todo = await this.todoService.getTodoById(editBtnId);
        this.renderTodoForm("edit", todo);

        this.addTodoOverviewButton.addEventListener("click", async (e) => {
          e.preventDefault();
          // this.renderTodosView(this.todosFromDB);
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
              finishedState: this.todoFinishedState.checked,
            };
            await this.todoService.updateTodo(editBtnId, updatedTodo);
            // this.renderTodosView(this.todosFromDB);
            this.initialize();
          }
        );
      });
    });

    this.todoDeleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (e) => {
        await this.todoService.deleteTodo(e.target.dataset.deleteId);
        // this.renderTodosView(this.todosFromDB);
        this.initialize();
      });
    });

    this.deleteAllTodosButtonElement.addEventListener("click", async () => {
      await this.todoService.deleteAllTodos();
      // this.renderTodosView(this.todosFromDB);
      this.initialize();
    })
    
    this.todoCheckboxElement.forEach((checkboxBtn) => {
      checkboxBtn.addEventListener("change" , async(event) => {
        const updatedState = {
          finishedState: event.target.checked,
        }
        await this.todoService.updateFinishedStateTodo(event.target.dataset.finishedStateId, updatedState);
      })
    })
    
    
  }

  async loadData() {
    this.todosFromDB = await this.todoService.getAllTodos();
  }

  renderTodosView(pTodos) {
    this.todoContainer.innerHTML = this.todoListView.showTodos(pTodos);
    this.addNewTodoButtonElemet = document.querySelector(".create-btn");
    this.deleteAllTodosButtonElement = document.querySelector(".delete-all-btn");
    this.sortByNameBtn = document.querySelector(".sort-by-name");
    this.sortByImportanceBtn = document.querySelector(".sort-by-importance");
    this.sortByDueDateBtn = document.querySelector(".sort-by-due-date");
    this.sortByCreationBtn = document.querySelector(".sort-by-creation");
    this.todoFilterSelectElement = document.querySelector(
      ".todo-filter-select"
    );
    this.todoEditBtns = document.querySelectorAll(".todo-edit-btn");
    this.todoDeleteBtns = document.querySelectorAll(".todo-delete-btn");
    this.todoListContainer = document.querySelector(".todo-list");
    this.todoCheckboxElement = document.querySelectorAll(".list-todo-finishedState")
  }

  renderTodoForm(type, _pEditTodo = []) {
    this.todoContainer.innerHTML = this.todoFormView.showTodosForm(
      type,
      _pEditTodo
    );
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

  initialize() {
    this.loadData().then(() => {
      this.renderTodosView(this.todosFromDB);
      this.eventHandlers();
    });
  }

}
