package pl.socha23.memba.business.todos

import pl.socha23.memba.business.Todo
import spock.lang.Specification

class ListTodosSpec extends Specification {

    def "list todos lists todos"() {
        given:
        def listTodos = new ListTodosImpl(todoStore([
                [id: "1", text: "foo"],
                [id: "2", text: "bar"]
        ]))
        expect:
        listTodos.listTodos("testId").size() == 2

    }

    private static TodoStore todoStore(List<Map> todos) {
        return [
                listTodosByUserId: {id -> todos}
        ] as TodoStore
    }

}
