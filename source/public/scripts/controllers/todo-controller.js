import TodoService from "../services/todo-service.js";
import OrderService from "../services/todo-order-service.js";
import TodoListView from "../views/todo-list-view.js";
import TodoFormView from "../views/todo-form-view.js";
import GeneralListView from "../views/general-view.js";

export default class TodoController {
  constructor() {
    this.todoService = new TodoService();
    this.orderService = new OrderService();

    this.generalListView = new GeneralListView();
    this.todoListView = new TodoListView();
    this.todoFormView = new TodoFormView();

    this.bodyHTML= document.querySelector("body");
    this.todosFromDB = [];
  }

  eventHandlers() {
    this.todoListView.styleSwitchBtn.addEventListener("click", () => {
      this.bodyHTML.classList.toggle("dark-mode");
    });

    /* START FILTER AND SORT HANDLERS */
    this.todoListView.sortByNameBtn.addEventListener("click", async () => {
      
      this.loadData();
      const sortedData = await this.orderService.sortTodos(
        this.todosFromDB,
        "title"
      );
      this.todoListView.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.todoListView.sortByImportanceBtn.addEventListener("click", () => {
      this.loadData();
      const sortedData = this.orderService.sortTodos(
        this.todosFromDB,
        "importance"
      );
      this.todoListView.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.todoListView.sortByDueDateBtn.addEventListener("click", () => {
      this.loadData();
      const sortedData = this.orderService.sortTodos(
        this.todosFromDB,
        "dueDate"
      );
      this.todoListView.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.todoListView.sortByCreationBtn.addEventListener("click", () => {
      this.loadData();
      const sortedData = this.orderService.sortTodos(
        this.todosFromDB,
        "creation"
      );
      this.todoListView.renderTodosView(sortedData);
      this.eventHandlers();
    });

    this.todoListView.todoFilterSelectElement.addEventListener("change", (event) => {
      if (event.target.value === "all") {
        this.loadData();
        this.todoListView.renderTodosView(this.todosFromDB);
        this.eventHandlers();
      } else if (event.target.value === "finished") {
        this.loadData();
        const filteredTodos = this.orderService.filterTodos(
          this.todosFromDB,
          "finished"
        );
        this.todoListView.renderTodosView(filteredTodos);
        this.eventHandlers();
      } else if (event.target.value === "unfinished") {
        this.loadData();
        const filteredTodos = this.orderService.filterTodos(
          this.todosFromDB,
          "unfinished"
        );
        this.todoListView.renderTodosView(filteredTodos);
        this.eventHandlers();
      }
    });
    /* END FILTERING AND SORTING */

    this.todoListView.addNewTodoButtonElemet.addEventListener("click", (event) => {
      event.preventDefault();
      this.todoFormView.renderTodoForm();

      this.todoFormView.styleSwitchBtn.addEventListener("click", () => {
        this.bodyHTML.classList.toggle("dark-mode");
      });

      this.todoFormView.addTodoCreateButton.addEventListener("click", async(e) => {
        e.preventDefault();
        if (!this.todoFormView.todoTitle.checkValidity()) {
          this.todoFormView.todoTitle.setAttribute(
            "placeholder",
            this.todoFormView.todoTitle.validationMessage
          );
          this.todoFormView.todoTitle.classList.add("invalid")
        } else if (!this.todoFormView.todoDescription.checkValidity()) {
          this.todoFormView.todoDescription.setAttribute(
            "placeholder",
            this.todoFormView.todoDescription.validationMessage
          );
          this.todoFormView.todoDescription.classList.add("invalid")
        } else {
          const newTodo = {
            title: this.todoFormView.todoTitle.value,
            description: this.todoFormView.todoDescription.value,
            importance: this.todoFormView.todoImportance.value,
            dueDate: this.todoFormView.todoDueDate.value,
            finishedState: this.todoFormView.todoFinishedState.checked
          };
          this.todoFormView.todoDescription.classList.remove("invalid")
          this.todoFormView.todoTitle.classList.remove("invalid")
          const result = await this.todoService.addTodo(newTodo);
          return result;
        }
        return null;
      });
      this.todoFormView.addTodoOverviewButton.addEventListener("click", async (e) => {
        e.preventDefault();
        this.initialize();
      });
    });

    this.todoListView.todoEditBtns.forEach((editBtn) => {

      editBtn.addEventListener("click", async (event) => {
        const editBtnId = event.target.dataset.editId;
        const todo = await this.todoService.getTodoById(editBtnId);
        this.todoFormView.renderTodoForm("edit", todo);
        this.todoFormView.styleSwitchBtn.addEventListener("click", () => {
          this.bodyHTML.classList.toggle("dark-mode");
        });

        this.todoFormView.addTodoOverviewButton.addEventListener("click", async (e) => {
          e.preventDefault();
          this.initialize();
        });

        this.todoFormView.addTodoUpdateAndOverviewButton.addEventListener(
          "click",
          async (e) => {
            e.preventDefault();
            if (!this.todoFormView.todoTitle.checkValidity()) {
              this.todoFormView.todoTitle.setAttribute(
                "placeholder",
                this.todoFormView.todoTitle.validationMessage
              );
              this.todoFormView.todoTitle.classList.add("invalid")
            } else if (!this.todoFormView.todoDescription.checkValidity()) {
              this.todoFormView.todoDescription.setAttribute(
                "placeholder",
                this.todoFormView.todoDescription.validationMessage
              );
              this.todoFormView.todoDescription.classList.add("invalid")
            } else {
            const updatedTodo = {
              title: this.todoFormView.todoTitle.value,
              description: this.todoFormView.todoDescription.value,
              importance: this.todoFormView.todoImportance.value,
              dueDate: this.todoFormView.todoDueDate.value,
              finishedState: this.todoFormView.todoFinishedState.checked
            };
            await this.todoService.updateTodo(editBtnId, updatedTodo);
            this.initialize();
            }
          }
        );
      });
    });

    this.todoListView.todoDeleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", async (e) => {
        await this.todoService.deleteTodo(e.target.dataset.deleteId);
        this.initialize();
      });
    });

    this.todoListView.deleteAllTodosButtonElement.addEventListener("click", async () => {
      await this.todoService.deleteAllTodos();
      this.initialize();
    });

    this.todoListView.todoCheckboxElement.forEach((checkboxBtn) => {
      checkboxBtn.addEventListener("change", async (event) => {
        const updatedState = {
          finishedState: event.target.checked
        };
        await this.todoService.updateFinishedStateTodo(
          event.target.dataset.finishedStateId,
          updatedState
        );
      });
    });
  }

  async loadData() {
    this.todosFromDB = await this.todoService.getAllTodos();
  }
  
  initialize() {
    this.loadData().then(() => {
      this.todoListView.renderTodosView(this.todosFromDB);
      this.eventHandlers();
    });
  }
}
