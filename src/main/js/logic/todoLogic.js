import DataStore from './DataStore'
import ServerData from './ServerData'
import Subscriptions from './Subscriptions'
import Statistics from "./Statistics";

class TodoLogic {

    ROOT_GROUP_ID = "root";

    dataStore = new DataStore();
    subscriptions = new Subscriptions();
    serverData = new ServerData((data) => {this.onReceiveServerData(data)});

    statistics = new Statistics([], []);

    onReceiveServerData(data) {
        this.dataStore.receiveItems(data);
        this.statistics = new Statistics(this.dataStore.todos, this.dataStore.groups);
        this.subscriptions.callSubscribers();
    }

    subscribe(component, onStateChanged) {
        if (this.subscriptions.countSubscribers() === 0) {
            this.serverData.setupIntervalReload()
        }
        this.subscriptions.subscribe(component, onStateChanged);
    }

    unsubscribe(component) {
        this.subscriptions.unsubscribe(component);
        if (this.subscriptions.countSubscribers() === 0) {
            this.serverData.cancelIntervalReload()
        }
    }

    areItemsNotLoaded() {return this.dataStore.areItemsNotLoaded()}

    listTodos(params) {return this.dataStore.listTodos(params)};
    listGroups(params) {return this.dataStore.listGroups(params)};

    addTodo(todo) {
        this.serverData.addTodo(todo)
            .then(t => this.dataStore.addTodo(t))
            .then(() => this.subscriptions.callSubscribers());
    }

    addGroup(group) {
        this.serverData.addGroup(group)
            .then(g => this.dataStore.addGroup(g))
            .then(() => this.subscriptions.callSubscribers());
    }

    setCompleted(todoId, completed) {
        this.dataStore.findTodoById(todoId).completed = completed;
        this.serverData.setCompleted(todoId, completed);
        this.subscriptions.callSubscribers();
    }

    updateTodo(todoId, todo) {
        this.serverData.updateTodo(todo)
            .then(t => this.dataStore.updateTodo(t))
            .then(() => this.subscriptions.callSubscribers())
    }

    updateGroup(groupId, group) {
        this.serverData.updateGroup(group)
            .then(g => this.dataStore.updateGroup(g))
            .then(() => this.subscriptions.callSubscribers())
    }

    deleteTodo(todoId) {
        this.serverData.deleteTodo(todoId)
            .then(() => this.dataStore.deleteTodo(todoId))
            .then(() => this.subscriptions.callSubscribers())
    }

    deleteGroup(idToRemove) {
        this.serverData.deleteGroup(idToRemove)
            .then(() => this.dataStore.deleteGroup(idToRemove))
            .then(() => this.subscriptions.callSubscribers())
    }

    findTodoById(id) { return this.dataStore.findTodoById(id)};
    findGroupById(id) { return this.dataStore.findGroupById(id)};

    countNotCompletedInGroup(groupId) {
        return this.statistics.countNotCompletedInGroup(groupId);
    }

}

const TODO_LOGIC = new TodoLogic();

export default TODO_LOGIC;