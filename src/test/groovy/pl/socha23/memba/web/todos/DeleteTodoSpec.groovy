package pl.socha23.memba.web.todos

import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.TodosController
import pl.socha23.memba.web.todos.model.CreateTodoRequest
import spock.lang.Specification

class DeleteTodoSpec extends Specification {

    def "delete a todo"() {
        given:
        def ops = new TestOps()
                .createTodo(new CreateTodoRequest(text: "t1"))
                .createTodo(new CreateTodoRequest(text: "t2"))
        def controller = new TodosController(ops.todoOps)
        def (t1, t2) = ops.listTodos()

        when:
        controller.deleteTodo(t1.id).block()

        then:
        ops.listTodos()[0].text == t2.text
    }
}
