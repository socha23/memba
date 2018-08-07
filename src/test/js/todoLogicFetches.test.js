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