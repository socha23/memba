import {sort} from "./sorting";

export default class DataStore {

    ROOT_GROUP_ID = "root";

    completedTodos = [];
    notCompletedTodos = [];
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
        const groupFilter = this._groupFilter(groupId);
        let unsorted = [];
        if (showCompleted) {
            unsorted = unsorted.concat(this.completedTodos.filter(groupFilter))
        }
        if (showNotCompleted) {
            unsorted = unsorted.concat(this.notCompletedTodos.filter(groupFilter))
        }
        return sort(unsorted, (this.findGroupById(groupId) || {}).todoOrder)
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

        this.groups = items.groups ? items.groups.map(this.fillItemDefaults) : this.groups;
        this.completedTodos = items.completedTodos ? items.completedTodos.map(this.fillItemDefaults) : this.completedTodos;
        this.notCompletedTodos = items.notCompletedTodos ? items.notCompletedTodos.map(this.fillItemDefaults) : this.notCompletedTodos;
    }

    fillItemDefaults = (item) => {
        return {groupId: this.ROOT_GROUP_ID, ...item}
    };

    addTodo(todo) {
        const item = this.fillItemDefaults(todo);
        if (item.completed) {
            return this.completedTodos.unshift(item);
        } else {
            return this.notCompletedTodos.unshift(item);
        }
    }

    addGroup(group) {
        return this.groups.unshift(this.fillItemDefaults(group));
    }

    updateTodo(todo) {
        this.deleteTodo(todo.id);
        return this.addTodo(todo);
    }

    updateGroup(group) {
        const idx = this.groups.findIndex(t => t.id === group.id);
        this.groups[idx] = this.fillItemDefaults(group);
        return this.groups[idx]
    }


    deleteTodo(todoId) {
        this._deleteTodoFrom(this.completedTodos, todoId);
        this._deleteTodoFrom(this.notCompletedTodos, todoId);
    }

    _deleteTodoFrom(collection, id) {
        const idx = collection.findIndex(t => t.id === id);
        collection.splice(idx, 1);
    }

    deleteGroup(idToRemove) {
        const idx = this.groups.findIndex(g => g.id === idToRemove);
        const groupToRemove = this.groups[idx];
        this.groups.splice(idx, 1);

        [this.completedTodos, this.notCompletedTodos, this.groups].forEach(collection =>
            collection
                .filter(i => i.groupId === idToRemove)
                .forEach(i => {i.groupId = groupToRemove.groupId})
        );
    }

    findTodoById(id) {
        return this.notCompletedTodos.find(t => t.id === id) || this.completedTodos.find(t => t.id === id)
    }

    findGroupById(id) {
        return this.groups.find(t => t.id === id)
    }

    listTodosWithDeadlines() {
        const result = this.notCompletedTodos.filter(t => t.when != null);
        result.sort((a, b) => (a.when || "").localeCompare(b.when || ""));
        return result;
    }


}
