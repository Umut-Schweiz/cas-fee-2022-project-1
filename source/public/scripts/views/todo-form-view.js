import GeneralListView  from "./general-view.js";

export default class TodoFormView {

  constructor(){
    this.generalListView = new GeneralListView();
  } 

  showTodosForm(type , _pEditTodo = []) {
    const todoForm = `
                    <section class="form-container">
                        <h1 class="page -title"> ${type === "edit" ? "Update" : "Add"} Todo Form</h1>
                        <form>
                            <div>
                            <label for="add-todo-title">Title</label>
                            <input id="add-todo-title" name="add-todo-title" type="text" placeholder="${
                              _pEditTodo.title ?? ""
                            }" required>
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
                            }" required></textarea>
                            </div>
                            <div class="add-todo-buttons">
                            <button class="add-todo-create-button">Create</button>
                            <button class="add-todo-update-overview-button">Update and Overview</button>
                            <button class="add-todo-overview-button">Overview</button>
                            </div>
                        </form>
                    </section>    
                        `;
    return todoForm;
  }

  renderTodoForm(type, _pEditTodo = []) {
    this.generalListView.renderGeneralView();
    this.generalListView.todoContainer.innerHTML = this.showTodosForm(
      type,
      _pEditTodo
    );
    this.styleSwitchBtn =  this.generalListView.toogleStyleBtn;
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


}
