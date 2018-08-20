import {jsonGet, jsonPost, jsonPut, restDelete} from '../apiHelper'

const REFRESH_ITEMS_EVERY_MS = 60 * 1000;

export default class ServerData {

    reloadIntervalHandler = null;
    onReceiveItems = null;
    lastFetchOn = 0;

    constructor(onReceiveItems) {
        this.onReceiveItems = onReceiveItems;
    }

    setupIntervalReload() {
        this._reload();
        this.reloadIntervalHandler = setInterval(() => {
            this._reload()
        }, REFRESH_ITEMS_EVERY_MS);
    }

    cancelIntervalReload() {
        clearInterval(this.reloadIntervalHandler);
    }

    _reload() {
        this._fetchItems();
    }

    _fetchItems() {
        const fetchTime = Date.now();
        this.lastFetchOn = fetchTime;
        jsonGet("/items")
            .then(r => {
                if (this.lastFetchOn === fetchTime) {
                    this._receiveItems(r)
                }
            });
    }

    _receiveItems(items) {
        this.onReceiveItems(items);
    }

    addTodo(todo) {
        return this._addItem("/todos", todo);
    }

    addGroup(group) {
        return this._addItem("/groups", group);
    }

    _addItem(path, item) {
        return jsonPost(path, item)
            .then(i => {this._reload(); return i});
    }


    setCompleted(todoId, completed) {
        return jsonPut("/todos/" + todoId + "/completed", completed)
            .then(i => {this._reload(); return i});
    }

    updateTodo(todo) {
        return this._updateItem("/todos", todo);
    }

    updateGroup(group) {
        return this._updateItem("/groups", group);
    }

    _updateItem(path, item) {
        return jsonPut(path + "/" + item.id, item)
            .then(i => {this._reload(); return i});
    }

    deleteTodo(todoId) {
        return this._deleteItem("/todos", todoId);
    }

    deleteGroup(groupId) {
        return this._deleteItem("/groups", groupId);
    }

    _deleteItem(path, idToRemove) {
        return restDelete(path + "/" + idToRemove)
            .then(i => {this._reload(); return i})
    }
}
