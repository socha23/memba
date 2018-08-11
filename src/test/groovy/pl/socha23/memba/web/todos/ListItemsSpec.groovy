package pl.socha23.memba.web.todos


import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.ItemsController
import pl.socha23.memba.web.todos.model.CreateTodoRequest
import pl.socha23.memba.web.todos.model.CreateUpdateGroupRequest
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class ListItemsSpec extends Specification {

    def "empty list"() {
        given:
        def ops = new TestOps()
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems()).size() == 0
    }

    def "list items lists todos"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateTodoRequest(text: "t1"))
                .createTodo(new CreateTodoRequest(text: "t2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems()).size() == 2
    }

    def "list items lists groups"() {
        given:
        def ops = new TestOps()
                .createGroup(new CreateUpdateGroupRequest(text: "g1"))
                .createGroup(new CreateUpdateGroupRequest(text: "g2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems()).size() == 2
    }

    def "list items lists both items and groups"() {
        given:
        def ops = new TestOps()
                .createGroup(new CreateUpdateGroupRequest(text: "g1"))
                .createGroup(new CreateUpdateGroupRequest(text: "g2"))
                .createTodo(new CreateTodoRequest(text: "t1"))
                .createTodo(new CreateTodoRequest(text: "t2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems())*.text == ["g2", "g1", "t2", "t1"]
    }

    def "list items lists types"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateTodoRequest(text: "g1"))
                .createGroup(new CreateUpdateGroupRequest(text: "g1"))

        def controller = new ItemsController(ops.todoOps, ops.groupOps)
        expect:

        toList(controller.currentUserItems())*.itemType == ["group", "todo"]
    }
}
