import DataStore from "../../main/js/logic/todos/DataStore";

it("returns empty list", () => {
    // given:
    const store = new DataStore();

    // when:
    store.receiveItems([]);

    // then:
    expect(store.listTodos({})).toEqual([])
});

it("returns right completed / not completed todos", () => {
    // given:
    const store = new DataStore();

    // when:
    store.receiveItems([
        {itemType: "todo", id: "one", completed: false},
        {itemType: "todo", id: "two", completed: true}
    ]);

    // then:
    expect(store.listTodos({}).map(i => i.id))
        .toEqual(["one"]);
    expect(store.listTodos({showCompleted: true}).map(i => i.id))
        .toEqual(["one", "two"]);
});

it("returns todos for a given group", () => {
    // given:
    const store = new DataStore();

    // when:
    store.receiveItems([
        {itemType: "todo", id: "one", completed: false, groupId: "A"},
        {itemType: "todo", id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(store.listTodos({groupId: "A"}).map(i => i.id))
        .toEqual(["one"]);
});

it("group is root when not declared", () => {
    // given:
    const store = new DataStore();

    // when:
    store.receiveItems([
        {itemType: "todo", id: "one", completed: false},
        {itemType: "todo", id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(store.listTodos({groupId: store.ROOT_GROUP_ID}).map(i => i.id))
        .toEqual(["one"]);
});

it("returns root by default ", () => {
    // given:
    const store = new DataStore();

    // when:
    store.receiveItems([
        {itemType: "todo", id: "one", completed: false, groupId: store.ROOT_GROUP_ID},
        {itemType: "todo", id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(store.listTodos({}).map(i => i.id))
        .toEqual(["one"]);
});