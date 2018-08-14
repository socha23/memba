import {ROOT_GROUP_ID} from "./constants";

export default class  Statistics {

    groupCounts = {};

    constructor(todos, groups) {
        this.todos = todos;
        this.groups = groups;
        this._recountGroupCounts();
    }

    _recountGroupCounts() {
        this._recountGroupCount(ROOT_GROUP_ID);
    }

    _recountGroupCount(groupId) {
        let count = this.todos
            .filter(t => (t.groupId || ROOT_GROUP_ID) === groupId)
            .filter(t => !t.completed)
            .length;
        this.groups
            .filter(g => (g.groupId || ROOT_GROUP_ID) === groupId)
            .forEach(g => {
                if (!(g.id in this.groupCounts)) {
                    this._recountGroupCount(g.id);
                }
                count += this.groupCounts[g.id];
            });
        this.groupCounts[groupId] = count;
    }

    countNotCompletedInGroup(groupId = ROOT_GROUP_ID) {
        return this.groupCounts[groupId] || 0;
    }
}
