import {sort} from "../../main/js/logic/todos/sorting";

it("when order empty sort by id desc", () => {
    expectSortedIds(["a", "c", "b"], []).toEqual(["c", "b", "a"]);
});

it("items not on the list before items on list", () => {
    expectSortedIds(["a", "c", "b"], ["b"]).toEqual(["c", "a", "b"]);
});

it("items on the list with order from the list", () => {
    expectSortedIds(["a", "d", "c", "b"], ["c", "d"]).toEqual(["b", "a", "c", "d"]);
});

it("same to same", () => {
    expectSortedIds(["a", "d", "c", "b"], ["a", "d", "c", "b"]).toEqual(["a", "d", "c", "b"]);
});

it("works with null order", () => {
    expectSortedIds(["a", "b", "c"], null).toEqual(["c", "b", "a"]);
});


it("additional items in order are ignored", () => {
    expectSortedIds(["a", "d", "c", "b"], ["a", "d", "e", "c", "b"]).toEqual(["a", "d", "c", "b"]);
});

function expectSortedIds(ids, order) {
    return expect(sort(ids.map(i => ({id: i})), order).map(o => o.id))
}
