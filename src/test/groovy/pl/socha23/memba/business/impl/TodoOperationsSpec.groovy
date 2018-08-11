package pl.socha23.memba.business.impl


import pl.socha23.memba.business.api.model.Todo
import pl.socha23.memba.dao.mem.MemTodoStore
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class TodoOperationsSpec extends Specification {

    def "adding a todo"() {
        given:
        def todoStore = new MemTodoStore()
        def ops = new TodosOperationsImpl(todoStore, new TestUserProvider())

        when:
        ops.createTodo(TestCreateUpdateTodo.monoWithText("one")).block()
        ops.createTodo(TestCreateUpdateTodo.monoWithText("two")).block()

        then:
        toList(ops.listCurrentUserTodos())*.text == ["two", "one"]
    }

    def "updating a todo"() {
        given:
        def todoStore = new MemTodoStore()
        def ops = new TodosOperationsImpl(todoStore, new TestUserProvider())

        when:
        Todo t = ops.createTodo(new TestCreateUpdateTodo()
                .withText("original")
                .withColor("red")
                .toMono()
        ).block()
        ops.updateTodo(t.id, TestCreateUpdateTodo.monoWithText("modified")).block()

        then:
        def changedTodo = toList(ops.listCurrentUserTodos())[0]
        changedTodo.text == "modified"
        changedTodo.color == "red"
    }


}
