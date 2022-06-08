export default class Todo {

  constructor(title, description = '', importance = 0, dueDate = 0, finishedState = false) {
      this.title = title;
      this.description = description;
      this.importance = importance;
      this.dueDate = dueDate;
      this.finishedState = finishedState;
  }
  
}