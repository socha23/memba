import {jsonGet, jsonPost, jsonPut} from './apiHelper'

const REFRESH_ITEMS_EVERY_MS = 10 * 1000;

class TodoLogic {

    ROOT_GROUP_ID = "root";

    subscriptionIdAutoinc = 0;

    items = [];
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
        this.reloadIntervalHandler = setInterval(() => {this.reload()}, REFRESH_ITEMS_EVERY_MS);
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

    areTodosNotLoaded() {
        return this.todosNotLoaded;
    }

    listItems({
                  showNotCompleted = true,
                  showCompleted = false,
                  groupId = this.ROOT_GROUP_ID,
              }) {

        return this.items.filter(t =>
            (t.completed && showCompleted) || ((!t.completed) && showNotCompleted)
            && ((t.groupId || this.ROOT_GROUP_ID) === groupId)
        );
    }

    fetchItems() {
        this.loading = true;
        jsonGet("/items")
            .then(r => {this.receiveItems(r)});
    }

    receiveItems(items) {
        this.loading = false;
        this.itemsNotLoaded = false;
        this.items = items.map(this.fillItemDefaults);
        this.callSubscribers();
    }

    fillItemDefaults = (item) => {
        return {groupId: this.ROOT_GROUP_ID, ...item}
    };

    _addItem(path, item) {
        this.loading = true;
        jsonPost(path, item)
            .then(r => {
                this.loading = false;
                this.items.unshift(this.fillItemDefaults(r));
                this.callSubscribers();
            });
    }

    addTodo(todo) {
        this._addItem("/todos", todo);
    }

    addGroup(group) {
        this._addItem("/groups", group);
    }

    setCompleted(todoId, completed) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.findItemById(todoId).completed = completed;
        this.callSubscribers();
        jsonPut("/todos/" + todoId + "/completed", completed)
            .then(r => {
                this.loading = false;
            });
    }

    _updateItem(path, itemId, item) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        jsonPut(path + "/" + itemId, item)
            .then(t => {
                this.loading = false;
                const idx = this.items.findIndex(t => t.id === itemId);
                this.items[idx] = this.fillItemDefaults(t);
                this.callSubscribers();
            });
    }

    updateTodo(todoId, todo) {
        this._updateItem("/todos", todoId, todo)
    }
    
    findItemById(id) {
        return this.items.find(t => t.id === id)
    }

    callSubscribers() {
        for (const subscriptionId in this.subscribers) {
            this.subscribers[subscriptionId]()
        }

    }


}

const TODO_LOGIC = new TodoLogic();

export default TODO_LOGIC;