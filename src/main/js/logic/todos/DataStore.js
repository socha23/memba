import {sort} from "./sorting";

export default class DataStore {

    ROOT_GROUP_ID = "root";

    todos = [];
    groups = [];
    itemsNotLoaded = true;

    areItemsNotLoaded() {
        return this.itemsNotLoaded;
    }

    listTodos({
                  showNotCompleted = true,
                  showCompleted = false,
                  groupId = this.ROOT_GROUP_ID,
              }) {
        const completionFilter = t => (t.completed && showCompleted) || ((!t.completed) && showNotCompleted);
        const todos = this.todos
            .filter(this._groupFilter(groupId))
            .filter(completionFilter);
        return sort(todos, (this.findGroupById(groupId) || {}).todoOrder)

    }

    listGroups({
                  groupId = this.ROOT_GROUP_ID,
              }) {

        const groups = this.groups
            .filter(this._groupFilter(groupId));
        return sort(groups, (this.findGroupById(groupId) || {}).groupOrder)
    }

    _groupFilter(groupId) {
        return t => (groupId === "") || ((t.groupId || this.ROOT_GROUP_ID) === groupId)
    }


    receiveItems(items) {
        this.itemsNotLoaded = false;
        this.todos = items
            .filter(t => t.itemType === "todo")
            .map(this.fillItemDefaults);
        this.groups = items
            .filter(t => t.itemType === "group")
            .map(this.fillItemDefaults);
    }

    fillItemDefaults = (item) => {
        return {groupId: this.ROOT_GROUP_ID, ...item}
    };

    addTodo(todo) {
        return this.todos.unshift(this.fillItemDefaults(todo));
    }

    addGroup(group) {
        return this.groups.unshift(this.fillItemDefaults(group));
    }

    updateTodo(todo) {
        return this._updateItem(todo, this.todos)
    }

    updateGroup(group) {
        return this._updateItem(group, this.groups)
    }

    _updateItem(item, collection) {
        const idx = collection.findIndex(t => t.id === item.id);
        collection[idx] = this.fillItemDefaults(item);
        return collection[idx]
    }


    deleteTodo(todoId) {
        const idx = this.todos.findIndex(t => t.id === todoId);
        this.todos.splice(idx, 1);
    }

    deleteGroup(idToRemove) {
        const idx = this.groups.findIndex(g => g.id === idToRemove);
        const groupToRemove = this.groups[idx];
        this.groups.splice(idx, 1);

        [this.todos, this.groups].forEach(collection =>
            collection
                .filter(i => i.groupId === idToRemove)
                .forEach(i => {i.groupId = groupToRemove.groupId})
        );
    }

    findTodoById(id) {
        return this.todos.find(t => t.id === id)
    }

    findGroupById(id) {
        return this.groups.find(t => t.id === id)
    }
}
