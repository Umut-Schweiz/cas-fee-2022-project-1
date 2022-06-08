export default class Order {

    sortByName(todoItem1, todoItem2) {
        return todoItem1.title < todoItem2.title ? -1 : 1;
    }

    sortByDueDate(todoItem1, todoItem2) {
        return new Date(todoItem1.dueDate).getTime() - new Date(todoItem2.dueDate).getTime();
    }

    sortByCreationDate(todoItem1, todoItem2) {
        return new Date(todoItem1.createdAt).getTime() - new Date(todoItem2.createdAt).getTime();
    }

    sortByImportance(todoItem1, todoItem2) {
        return todoItem2.importance - todoItem1.importance;
    }

    getUnfinished(todo) {
        return !todo.finishedState;
    }

    getFinished(todo) {
        return todo.finishedState;
    }

    filterTodos(pArray, filterBy = 'finished') {
        if (filterBy === 'unfinished') {
            return pArray.filter(this.getUnfinished);
        }
        if (filterBy === 'finished') {
            return pArray.filter(this.getFinished);
        }
    }

    sortTodos(pArray, sortBy = 'title') {

        if (sortBy === 'title') {
            return pArray.sort(this.sortByName);
        }
        if (sortBy === 'dueDate') {
            return pArray.sort(this.sortByDueDate);
        }
        if (sortBy === 'creation') {
            return pArray.sort(this.sortByCreationDate);
        }
        if (sortBy === 'importance') {
            return pArray.sort(this.sortByImportance);
        }
    }
}