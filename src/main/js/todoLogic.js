import {jsonGet, jsonPost, jsonPut} from './apiHelper'

const REFRESH_TODOS_EVERY_MS = 10 * 1000;

class TodoLogic {

    todos = [];
    todosNotLoaded = true;
    loading = false;
    subscribers = {};
    reloadIntervalHandler = null;

    subscribe(component, onStateChanged) {
        if (this.countSubscribers() === 0) {
            this.setupIntervalReload()
        }
        this.subscribers[component] = onStateChanged;
    }

    unsubscribe(component) {
        delete this.subscribers[component];
        if (this.countSubscribers() === 0) {
            this.cancelIntervalReload();
        }
    }

    countSubscribers() {
        return Object.keys(this.subscribers).length;
    }


    setupIntervalReload() {
        if (this.todosNotLoaded) {
            this.reload();
        }

        this.reloadIntervalHandler = setInterval(() => {this.reload()}, REFRESH_TODOS_EVERY_MS);
    }

    cancelIntervalReload() {
        clearInterval(this.reloadIntervalHandler);
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

    update(todoId, todo) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        jsonPut("/todos/" + todoId, todo)
            .then(t => {
                this.loading = false;
                const idx = this.todos.findIndex(t => t.id === todoId);
                this.todos[idx] = t;
                this.callSubscribers();
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