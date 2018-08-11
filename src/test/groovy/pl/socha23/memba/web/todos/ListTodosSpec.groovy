package pl.socha23.memba.web.todos


import pl.socha23.memba.web.todos.controllers.ItemsController
import pl.socha23.memba.web.todos.model.CreateTodoRequest
import pl.socha23.memba.web.todos.model.CreateUpdateGroupRequest
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class ListTodosSpec extends Specification {

    def "empty todos"() {
        given:
        def ops = new TestTodoOps()
        def controller = new ItemsController(ops)

        expect:
        toList(controller.currentUserItems()).size() == 0
    }

    def "nonempty todos flux"() {
        given:
        def ops = new TestTodoOps()
            .createTodo(new CreateTodoRequest(text: "t1"))
            .createTodo(new CreateTodoRequest(text: "t2"))
        def controller = new ItemsController(ops)

        expect:
        toList(controller.currentUserItems()).size() == 2
    }

    def "list items lists types"() {
        given:
        def ops = new TestTodoOps()
            .createTodo(new CreateTodoRequest(text: "g1"))
            .createGroup(new CreateUpdateGroupRequest(text: "g1"))
        
        def controller = new ItemsController(ops)
        expect:

        toList(controller.currentUserItems())*.itemType == ["group", "todo"]
    }
}
