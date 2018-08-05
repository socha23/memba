package pl.socha23.memba.web.todos


import pl.socha23.memba.business.api.logic.TodosOperations
import reactor.core.publisher.Flux
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class ListTodosSpec extends Specification {

    def "empty todos"() {
        given:
        def controller = new TodosController(todosOperations([]))

        expect:
        toList(controller.currentUserTodos()).size() == 0
    }

    def "noneempty todos flux"() {
        given:
        def controller = new TodosController(todosOperations([
                [id: "1", text: "todo 1"],
                [id:"2", text: "todo 2"]
        ]))

        expect:
        toList(controller.currentUserTodos()).size() == 2
    }

    private static TodosOperations todosOperations(List<Map> todos) {
        [listCurrentUserTodos: {-> Flux.fromIterable(todos)}] as TodosOperations
    }
}
