import DataStore from './todos/DataStore'
import ServerData from './todos/ServerData'
import Subscriptions from './Subscriptions'
import Statistics from "./Statistics";
import {ROOT_GROUP_ID} from "./constants";

class TodoLogic {

    ROOT_GROUP_ID = ROOT_GROUP_ID;

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
        return this.serverData.addTodo(todo)
            .then(t => this.dataStore.addTodo(t))
            .then(() => this.subscriptions.callSubscribers());
    }

    addGroup(group) {
        return this.serverData.addGroup(group)
            .then(g => {this.dataStore.addGroup(g); return g})
            .then(g => {this.subscriptions.callSubscribers(); return g});
    }

    setCompleted(todoId, completed) {
        this.dataStore.findTodoById(todoId).completed = completed;
        this.serverData.setCompleted(todoId, completed);
        this.subscriptions.callSubscribers();
    }

    updateTodo(todoId, todo) {
        return this.serverData.updateTodo(todo)
            .then(t => this.dataStore.updateTodo(t))
            .then(() => this.subscriptions.callSubscribers())
    }

    updateGroup(groupId, group) {
        return this.serverData.updateGroup(group)
            .then(g => {this.dataStore.updateGroup(g); return g})
            .then(g => {this.subscriptions.callSubscribers(); return g})
    }

    deleteTodo(todoId) {
        return this.serverData.deleteTodo(todoId)
            .then(() => this.dataStore.deleteTodo(todoId))
            .then(() => this.subscriptions.callSubscribers())
    }

    deleteGroup(idToRemove) {
        return this.serverData.deleteGroup(idToRemove)
            .then(() => this.dataStore.deleteGroup(idToRemove))
            .then(() => this.subscriptions.callSubscribers())
    }

    findTodoById(id) { return this.dataStore.findTodoById(id)};
    findGroupById(id) { return this.dataStore.findGroupById(id)};

    countNotCompletedInGroup(groupId) {
        return this.statistics.countNotCompletedInGroup(groupId);
    }

    isTopLevel(item) {
        return (item.groupId  || ROOT_GROUP_ID) === ROOT_GROUP_ID;
    }
}

const TODO_LOGIC = new TodoLogic();

export default TODO_LOGIC;