import {jsonGet, jsonPost, jsonPut, restDelete} from './apiHelper'

const REFRESH_ITEMS_EVERY_MS = 10 * 1000;

class TodoLogic {

    ROOT_GROUP_ID = "root";

    subscriptionIdAutoinc = 0;

    todos = [];
    groups = [];
    itemsNotLoaded = true;
    loading = false;
    subscribers = {};
    reloadIntervalHandler = null;


    subscribe(component, onStateChanged) {
        const subscriptionId = this.subscriptionIdAutoinc++;
        component.subscriptionId = subscriptionId;
        if (this.countSubscribers() === 0) {
            this.setupIntervalReload()
        }
        this.subscribers[subscriptionId] = onStateChanged;
    }

    unsubscribe(component) {
        const subscriptionId = component.subscriptionId;
        delete this.subscribers[subscriptionId];
        if (this.countSubscribers() === 0) {
            this.cancelIntervalReload();
        }
    }

    countSubscribers() {
        return Object.keys(this.subscribers).length;
    }


    setupIntervalReload() {
        this.reload();
        this.reloadIntervalHandler = setInterval(() => {
            this.reload()
        }, REFRESH_ITEMS_EVERY_MS);
    }

    cancelIntervalReload() {
        clearInterval(this.reloadIntervalHandler);
    }

    reload() {
        this.fetchItems();
    }

    isLoading() {
        return this.loading;
    }

    areItemsNotLoaded() {
        return this.itemsNotLoaded;
    }

    listTodos({
                  showNotCompleted = true,
                  showCompleted = false,
                  groupId = this.ROOT_GROUP_ID,
              }) {

        const rightGroup = t => ((t.groupId || this.ROOT_GROUP_ID) === groupId);
        const rightCompletion = t => (t.completed && showCompleted) || ((!t.completed) && showNotCompleted);

        return this.todos
            .filter(rightGroup)
            .filter(rightCompletion);
    }

    listGroups({
                  groupId = this.ROOT_GROUP_ID,
              }) {

        const rightGroup = t => ((t.groupId || this.ROOT_GROUP_ID) === groupId);

        return this.groups
            .filter(rightGroup);
    }

    fetchItems() {
        this.loading = true;
        jsonGet("/items")
            .then(r => {
                this.receiveItems(r)
            });
    }

    receiveItems(items) {
        this.loading = false;
        this.itemsNotLoaded = false;
        this.todos = items
            .filter(t => t.itemType === "todo")
            .map(this.fillItemDefaults);
        this.groups = items
            .filter(t => t.itemType === "group")
            .map(this.fillItemDefaults);
        this.callSubscribers();
    }

    fillItemDefaults = (item) => {
        return {groupId: this.ROOT_GROUP_ID, ...item}
    };

    _addItem(path, item, collection) {
        this.loading = true;
        jsonPost(path, item)
            .then(r => {
                this.loading = false;
                collection.unshift(this.fillItemDefaults(r));
                this.callSubscribers();
            });
    }

    addTodo(todo) {
        this._addItem("/todos", todo, this.todos);
    }

    addGroup(group) {
        this._addItem("/groups", group, this.groups);
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

    _updateItem(path, itemId, item, collection) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        jsonPut(path + "/" + itemId, item)
            .then(t => {
                this.loading = false;
                const idx = collection.findIndex(t => t.id === itemId);
                collection[idx] = this.fillItemDefaults(t);
                this.callSubscribers();
            });
    }

    updateTodo(todoId, todo) {
        this._updateItem("/todos", todoId, todo, this.todos)
    }

    updateGroup(groupId, group) {
        this._updateItem("/groups", groupId, group, this.groups)
    }

    deleteTodo(todoId) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        restDelete("/todos/" + todoId)
            .then(() => {
                this.loading = false;
                const idx = this.todos.findIndex(t => t.id === todoId);
                this.todos.splice(idx, 1);
                this.callSubscribers();
            });
    }


    _findItemById(id, collection) {
        return collection.find(t => t.id === id)
    }

    findTodoById(id) {
        return this._findItemById(id, this.todos)
    }

    findGroupById(id) {
        return this._findItemById(id, this.groups)
    }

    callSubscribers() {
        for (const subscriptionId in this.subscribers) {
            this.subscribers[subscriptionId]()
        }

    }


}

const TODO_LOGIC = new TodoLogic();

export default TODO_LOGIC;