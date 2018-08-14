import Statistics from "../../main/js/logic/Statistics";
import {ROOT_GROUP_ID} from "../../main/js/logic/constants";

it("empty statistics on empty", () => {
    const stats = new Statistics([], []);
    expect(stats.countNotCompletedInGroup(ROOT_GROUP_ID)).toEqual(0)
});

it("empty statistics for nonexistant group", () => {
    const stats = new Statistics([], []);
    expect(stats.countNotCompletedInGroup(ROOT_GROUP_ID)).toEqual(0)
});

it("count todos", () => {
    const stats = new Statistics([
        {text: "one"},
        {groupId: ROOT_GROUP_ID, text: "two"},
    ], []);
    expect(stats.countNotCompletedInGroup(ROOT_GROUP_ID)).toEqual(2)
});

it("count only incomplete todos", () => {
    const stats = new Statistics([
        {groupId: ROOT_GROUP_ID, text: "one", completed: true},
        {groupId: ROOT_GROUP_ID, text: "two"},
    ], []);
    expect(stats.countNotCompletedInGroup(ROOT_GROUP_ID)).toEqual(1)
});

it("count in subgroup", () => {

    const stats = new Statistics([
        {groupId: ROOT_GROUP_ID, text: "1", completed: true},
        {groupId: ROOT_GROUP_ID, text: "2"},
        {groupId: "g1", text: "g1-one"},
        {groupId: "g1", text: "g1-two", completed: true},
        {groupId: "g2", text: "g2-one"},
        {groupId: "g2", text: "g2-two"},
    ], [
        {groupId: ROOT_GROUP_ID, id: "g1", text: "g1"},
        {groupId: ROOT_GROUP_ID, id: "g2", text: "g2"},

    ]);
    expect(stats.countNotCompletedInGroup("g1")).toEqual(1);
    expect(stats.countNotCompletedInGroup("g2")).toEqual(2);
});

it("adds subgroups", () => {

    const stats = new Statistics([
        {groupId: ROOT_GROUP_ID, text: "1"},
        {groupId: "g1", text: "g1"},
        {groupId: "g2", text: "g2"},
        {groupId: "g3", text: "g3"},
    ], [
        {groupId: ROOT_GROUP_ID, id: "g1", text: "g1"},
        {groupId: "g1", id: "g2", text: "g2"},
        {groupId: "g2", id: "g3", text: "g3"},

    ]);
    expect(stats.countNotCompletedInGroup("g3")).toEqual(1);
    expect(stats.countNotCompletedInGroup("g2")).toEqual(2);
    expect(stats.countNotCompletedInGroup("g1")).toEqual(3);
    expect(stats.countNotCompletedInGroup(ROOT_GROUP_ID)).toEqual(4);
});
