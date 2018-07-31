package pl.socha23.memba.web.todos


import pl.socha23.memba.business.todos.ListTodos
import pl.socha23.memba.web.security.TestUserProvider
import spock.lang.Specification

import static pl.socha23.memba.web.FluxUtils.toList

class ListTodosSpec extends Specification {

    def "empty todos"() {
        given:
        def controller = testController([])

        expect:
        def result =
        toList(controller.fluxTodos()).size() == 0
    }

    def "noneempty todos flux"() {
        given:
        def controller = testController([
                [id: "1", text: "todo 1"],
                [id:"2", text: "todo 2"]
        ])

        expect:
        toList(controller.fluxTodos()).size() == 2
    }

    private static TodosController testController(List<Map> todos) {
        new TodosController({userId -> todos} as ListTodos, new TestUserProvider())
    }
}
