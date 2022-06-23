import Helper from "../services/helper-service.js";
import GeneralListView  from "./general-view.js";

export default class TodoListView {

  constructor(){
    this.generalListView = new GeneralListView();
  }

  showTodos(pData) {
    const filterMenu = `
                        <section class="filter-bar">
                            <button class="sort-by-name">Name</button>
                            <button class="sort-by-due-date">By Due Date</button>
                            <button class="sort-by-creation">By Creation Date</button>
                            <button class="sort-by-importance">By Importance</button>
                            <select class="todo-filter-select">
                                <option value="all">Choose <></option>
                                <option value="all">All Todo List</option>
                                <option value="finished">Finished</option>
                                <option value="unfinished">Unfinished</option>
                            </select>
                        </section>
            `;
    const todoList = `
                      <section class="todo-list">
                          ${
                            pData.length === 0
                              ? "<p>Not Todo found</p>"
                              : pData
                                  .map(
                                    (todo) => `
                          <div class="todo-item">
                              <div class="remaining-time">${Helper.calculateRemainingDay(
                                todo.createdAt,
                                todo.dueDate
                              )}</div>
                              <div class="description">${todo.title}</div>
                              <div class="importance">${Helper.importanceSymbole(
                                todo.importance
                              )}</div>
                              <button data-edit-id="${
                                todo.id
                              }" class="todo-edit-btn">Edit</button>
                              <div>
                                  <input
                                  type="checkbox"
                                  class="list-todo-finishedState"
                                  id="list-todo-finishedState-${todo.id}"
                                  data-finished-state-id="${todo.id}"
                                  name="finishedState"
                                  ${todo.finishedState ? "checked" : ""}
                                  />
                                  <label for="list-todo-finishedState-${todo.id}">Finished</label>                            
                              </div>
                              <div class="todo-description">${
                                todo.description
                              }</div>
                              <div class="todo-date">${Helper.dateFormatter(
                                todo.dueDate
                              )}</div>
                              <button data-delete-id ="${
                                todo.id
                              }" class="todo-delete-btn">Delete</button>
                              </div>
                              `
                                  )
                                  .join("")
                          }
                              <div class="top-buttons">

                                <button class="create-btn"> + </button>
                                <button class="delete-all-btn">ALL</button>
                              </div>
                              
                          </div>
                      </section>
            `;

    const todosView = `
                    ${filterMenu}
                    ${todoList}
            `;

    return todosView;
  }

  renderTodosView (pTodos) {
    this.generalListView.renderGeneralView();
    this.generalListView.todoContainer.innerHTML = this.showTodos(pTodos);
    this.styleSwitchBtn =  this.generalListView.toogleStyleBtn;
    this.addNewTodoButtonElemet = document.querySelector(".create-btn");
    this.deleteAllTodosButtonElement =
      document.querySelector(".delete-all-btn");
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
    this.todoCheckboxElement = document.querySelectorAll(
      ".list-todo-finishedState"
    );
    
  }
}
