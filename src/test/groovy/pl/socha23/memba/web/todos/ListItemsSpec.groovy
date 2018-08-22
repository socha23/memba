package pl.socha23.memba.web.todos

import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.ItemsController
import pl.socha23.memba.web.todos.model.CreateOrUpdateGroupRequest
import pl.socha23.memba.web.todos.model.CreateOrUpdateTodoRequest
import spock.lang.Specification

class ListItemsSpec extends Specification {

    def "root group always returned"() {
        given:
        def ops = new TestOps()
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        controller.currentUserItems().block().groups.size() == 1
    }

    def "list items lists todos"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateOrUpdateTodoRequest(text: "t1"))
                .createTodo(new CreateOrUpdateTodoRequest(text: "t2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        controller.currentUserItems().block().notCompletedTodos.size() == 2
    }

    def "list items lists groups"() {
        given:
        def ops = new TestOps()
                .createGroup(new CreateOrUpdateGroupRequest(text: "g1"))
                .createGroup(new CreateOrUpdateGroupRequest(text: "g2"))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        expect:
        controller.currentUserItems().block().groups.size() == 3
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
        controller.currentUserItems().block().groups*.text == ["ROOT", "g2", "g1"]
        controller.currentUserItems().block().notCompletedTodos*.text == ["t2", "t1"]
    }

    def "can ask only for not completed"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateOrUpdateTodoRequest(text: "t1"))
                .createTodo(new CreateOrUpdateTodoRequest(text: "t2", completed: true))
        def controller = new ItemsController(ops.todoOps, ops.groupOps)

        when:
        def result = controller.currentUserItems(false).block()

        then:
        result.completedTodos == null
        result.notCompletedTodos.size() == 1
    }

}
