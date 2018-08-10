package pl.socha23.memba.web.todos


import pl.socha23.memba.business.api.logic.TodosOperations
import pl.socha23.memba.business.api.model.BasicGroup
import pl.socha23.memba.business.api.model.BasicTodo
import pl.socha23.memba.business.api.model.Todo
import pl.socha23.memba.business.impl.TestUserProvider
import pl.socha23.memba.business.impl.TodosOperationsImpl
import pl.socha23.memba.dao.mem.MemGroupStore
import pl.socha23.memba.dao.mem.MemTodoStore
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class ListTodosSpec extends Specification {

    def "empty todos"() {
        given:
        def controller = new TodosController(todosOperations([]))

        expect:
        toList(controller.currentUserItems()).size() == 0
    }

    def "noneempty todos flux"() {
        given:
        def controller = new TodosController(todosOperations([
                [id: "1", text: "todo 1"],
                [id:"2", text: "todo 2"]
        ]))

        expect:
        toList(controller.currentUserItems()).size() == 2
    }

    def "list items lists types"() {
        given:
        def ops = new TestTodoOps()
            .createTodo(new CreateTodoRequest(text: "g1"))
            .createGroup(new CreateGroupRequest(text: "g1"))
        
        def controller = new TodosController(ops)
        expect:

        toList(controller.currentUserItems())*.itemType == ["group", "todo"]
    }


    private static TodosOperations todosOperations(List<Map> todos) {
        [listCurrentUserItems: {-> Flux.fromIterable(todos.collect{t -> new BasicTodo(t)})}] as TodosOperations
    }
}
