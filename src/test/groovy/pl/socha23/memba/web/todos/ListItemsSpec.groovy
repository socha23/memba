package pl.socha23.memba.web.todos

import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.ItemsController
import pl.socha23.memba.web.todos.model.CreateOrUpdateGroupRequest
import pl.socha23.memba.web.todos.model.CreateOrUpdateTodoRequest
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class ListItemsSpec extends Specification {

    def "root group always returned"() {
        given:
        def ops = new TestOps()
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems()).size() == 1
    }

    def "list items lists todos"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateOrUpdateTodoRequest(text: "t1"))
                .createTodo(new CreateOrUpdateTodoRequest(text: "t2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems()).size() == 3 // because also root
    }

    def "list items lists groups"() {
        given:
        def ops = new TestOps()
                .createGroup(new CreateOrUpdateGroupRequest(text: "g1"))
                .createGroup(new CreateOrUpdateGroupRequest(text: "g2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems()).size() == 3
    }

    def "list items lists both items and groups"() {
        given:
        def ops = new TestOps()
                .createGroup(new CreateOrUpdateGroupRequest(text: "g1"))
                .createGroup(new CreateOrUpdateGroupRequest(text: "g2"))
                .createTodo(new CreateOrUpdateTodoRequest(text: "t1"))
                .createTodo(new CreateOrUpdateTodoRequest(text: "t2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        toList(controller.currentUserItems())*.text == ["ROOT", "g2", "g1", "t2", "t1"]
    }

    def "list items lists types"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateOrUpdateTodoRequest(text: "g1"))
                .createGroup(new CreateOrUpdateGroupRequest(text: "g1"))

        def controller = new ItemsController(ops.todoOps, ops.groupOps)
        expect:

        toList(controller.currentUserItems())*.itemType == ["group", "group", "todo"]
    }
}
