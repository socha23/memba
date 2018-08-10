import todoLogic from '../../main/js/todoLogic'

it("returns empty list", () => {
    // when:
    todoLogic.receiveItems([]);

    // then:
    expect(todoLogic.listItems({})).toEqual([])
});

it("returns right completed / not completed todos", () => {
    // when:
    todoLogic.receiveItems([
        {id: "one", completed: false},
        {id: "two", completed: true}
    ]);

    // then:
    expect(todoLogic.listItems({}).map(i => i.id))
        .toEqual(["one"]);
    expect(todoLogic.listItems({showCompleted: true}).map(i => i.id))
        .toEqual(["one", "two"]);
});

it("returns todos for a given group", () => {
    // when:
    todoLogic.receiveItems([
        {id: "one", completed: false, groupId: "A"},
        {id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(todoLogic.listItems({groupId: "A"}).map(i => i.id))
        .toEqual(["one"]);
});

it("group is root when not declared", () => {
    // when:
    todoLogic.receiveItems([
        {id: "one", completed: false},
        {id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(todoLogic.listItems({groupId: todoLogic.ROOT_GROUP_ID}).map(i => i.id))
        .toEqual(["one"]);
});

it("returns root by default ", () => {
    // when:
    todoLogic.receiveItems([
        {id: "one", completed: false, groupId: todoLogic.ROOT_GROUP_ID},
        {id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(todoLogic.listItems({}).map(i => i.id))
        .toEqual(["one"]);
});