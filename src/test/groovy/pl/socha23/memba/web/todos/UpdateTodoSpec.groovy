package pl.socha23.memba.web.todos

import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.TodosController
import pl.socha23.memba.web.todos.model.CreateTodoRequest
import pl.socha23.memba.web.todos.model.UpdateTodoRequest
import reactor.core.publisher.Mono
import spock.lang.Specification

class UpdateTodoSpec extends Specification {

    def "update a todo"() {
        given:
        def ops = new TestOps()
        def todo = ops.todoOps.createTodo(Mono.just(new CreateTodoRequest(text: "todo"))).block()
        def controller = new TodosController(ops.todoOps)

        when:
        def request = new UpdateTodoRequest()
        request.text  = "todo updated"
        controller.updateTodo(todo.id, request).block()

        then:
        ops.listTodos()[0].text == "todo updated"
    }
}
