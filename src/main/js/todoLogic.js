import {jsonGet} from './apiHelper'

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

    listTodos() {
        return this.todos;
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

    callSubscribers() {
        for (var subscriber in this.subscribers) {
            this.subscribers[subscriber]()
        }

    }

    addTodo({text}) {
        this.todos.unshift({
            id: "auto" + this.autoinc++,
            text: text
        });
        this.callSubscribers();
    }
}

const TODO_LOGIC = new TodoLogic();

export default TODO_LOGIC;