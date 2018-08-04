import {jsonGet, jsonPost, jsonPut} from './apiHelper'

class TodoLogic {
    todos = [];
    todosNotLoaded = true;
    loading = false;
    subscribers = {};

    autoinc = 0;

    subscribe(component, onStateChanged) {
        this.subscribers[component] = onStateChanged;
        if (this.todosNotLoaded) {
            this.reload();
        }
    }

    unsubscribe(component) {
        delete this.subscribers[component];
    }

    reload() {
        if (this.loading) {
            return;
        }
        this.fetchTodos();
    }

    isLoading() {
        return this.loading;
    }

    areTodosNotLoaded() {
        return this.todosNotLoaded;
    }

    listTodos({
                  showNotCompleted = true,
                  showCompleted = false,
              }) {

        return this.todos.filter(t => (t.completed && showCompleted) || ((!t.completed) && showNotCompleted));
    }

    fetchTodos() {
        this.loading = true;
        jsonGet("/todos")
            .then(r => {this.receiveTodos(r)});
    }

    receiveTodos(todos) {
        this.loading = false;
        this.todosNotLoaded = false;
        this.todos = todos;
        this.callSubscribers();
    }

    addTodo(todo) {
        this.loading = true;
        jsonPost("/todos", todo)
            .then(r => {
                this.loading = false;
                this.todos.unshift(r);
                this.callSubscribers();
            });
    }

    setCompleted(todoId, completed) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.findTodoById(todoId).completed = completed;
        this.callSubscribers();
        jsonPut("/todos/" + todoId + "/completed", completed)
            .then(r => {
                this.loading = false;
            });
    }

    findTodoById(id) {
        return this.todos.find(t => t.id === id)
    }

    callSubscribers() {
        for (const subscriber in this.subscribers) {
            this.subscribers[subscriber]()
        }

    }


}

const TODO_LOGIC = new TodoLogic();

export default TODO_LOGIC;