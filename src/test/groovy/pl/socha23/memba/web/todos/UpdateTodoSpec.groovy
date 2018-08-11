package pl.socha23.memba.web.todos


import pl.socha23.memba.web.todos.controllers.TodosController
import pl.socha23.memba.web.todos.model.CreateTodoRequest
import pl.socha23.memba.web.todos.model.UpdateTodoRequest
import reactor.core.publisher.Mono
import spock.lang.Specification

class UpdateTodoSpec extends Specification {

    def "update a todo"() {
        given:
        def ops = new TestTodoOps()
        def todo = ops.createTodo(Mono.just(new CreateTodoRequest(text: "todo"))).block()
        def controller = new TodosController(ops)

        when:
        def request = new UpdateTodoRequest()
        request.text  = "todo updated"
        controller.updateTodo(todo.id, request).block()

        then:
        ops.listTodos()[0].text == "todo updated"
    }
}
