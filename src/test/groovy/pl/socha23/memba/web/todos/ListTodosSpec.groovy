package pl.socha23.memba.web.todos


import pl.socha23.memba.business.todos.ListTodos
import pl.socha23.memba.web.security.TestUserProvider
import spock.lang.Specification

import static pl.socha23.memba.web.FluxUtils.fluxResultItems

class ListTodosSpec extends Specification {

    def "empty todos list"() {
        given:
        def controller = testController([])

        expect:
        controller.listTodos().items.size() == 0
    }

    def "noneempty todos list"() {
        given:
        def controller = testController([
                [id: "1", text: "todo 1"],
                [id:"2", text: "todo 2"]
        ])

        expect:
        controller.listTodos().items.size() == 2
    }

    def "noneempty todos flux"() {
        given:
        def controller = testController([
                [id: "1", text: "todo 1"],
                [id:"2", text: "todo 2"]
        ])

        expect:
        def result = controller.fluxTodos()
        fluxResultItems(result).size() == 2
    }

    private static TodosController testController(List<Map> todos) {
        new TodosController({userId -> todos} as ListTodos, new TestUserProvider())
    }
}
