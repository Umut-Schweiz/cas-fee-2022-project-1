import Todo from "../models/todo.js";

export default class TodoService {
  async fetchReq(method, url, data = null) {
    const reqContent = {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true 
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    if (data !== null) {
      reqContent.body = JSON.stringify(data);
    }
    return fetch(url, reqContent).then((res) => res.json());
  }

  async addTodo(todoInput) {
    const todo = new Todo(
      todoInput.title,
      todoInput.description,
      todoInput.importance,
      todoInput.dueDate,
      todoInput.finishedState
    );
    const newTodo = await this.fetchReq(
      "POST",
      "http://localhost:3000/api/todos",
      todo
    );
    return newTodo;
  }

  async getAllTodos() {
    const todos = await this.fetchReq("GET", "http://localhost:3000/api/todos");
    return todos;
  }

  async deleteTodo(id) {
    const deletedTodo = this.fetchReq("DELETE",`http://localhost:3000/api/todos/${id}` );

    return deletedTodo;
  }

  async getTodoById(id) {
    const todo = await this.fetchReq(
      "GET",
      `http://localhost:3000/api/todos/${id}`
    );
    return todo;
  }

  async updateTodo(id, pUpdatedTodo) {
     await this.fetchReq("PUT",`http://localhost:3000/api/todos/${id}`, pUpdatedTodo);
  }

}
