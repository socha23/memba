import todoLogic from '../../main/js/todoLogic'

it("returns empty list", () => {
    // when:
    todoLogic.receiveTodos([]);

    // then:
    expect(todoLogic.listTodos({})).toEqual([])
});

it("returns right completed / not completed todos", () => {
    // when:
    todoLogic.receiveTodos([
        {id: "one", completed: false},
        {id: "two", completed: true}
    ]);

    // then:
    expect(todoLogic.listTodos({}).map(i => i.id))
        .toEqual(["one"]);
    expect(todoLogic.listTodos({showCompleted: true}).map(i => i.id))
        .toEqual(["one", "two"]);
});

it("returns todos for a given group", () => {
    // when:
    todoLogic.receiveTodos([
        {id: "one", completed: false, groupId: "A"},
        {id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(todoLogic.listTodos({groupId: "A"}).map(i => i.id))
        .toEqual(["one"]);
});

it("group is root when not declared", () => {
    // when:
    todoLogic.receiveTodos([
        {id: "one", completed: false},
        {id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(todoLogic.listTodos({groupId: todoLogic.ROOT_GROUP_ID}).map(i => i.id))
        .toEqual(["one"]);
});

it("returns root by default ", () => {
    // when:
    todoLogic.receiveTodos([
        {id: "one", completed: false, groupId: todoLogic.ROOT_GROUP_ID},
        {id: "two", completed: false, groupId: "B"}
    ]);

    // then:
    expect(todoLogic.listTodos({}).map(i => i.id))
        .toEqual(["one"]);
});