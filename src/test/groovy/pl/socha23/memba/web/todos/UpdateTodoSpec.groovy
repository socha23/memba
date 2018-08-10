package pl.socha23.memba.web.todos


import pl.socha23.memba.business.api.logic.TodosOperations
import pl.socha23.memba.business.api.model.BasicTodo
import pl.socha23.memba.business.impl.TestUserProvider
import pl.socha23.memba.business.impl.TodosOperationsImpl
import pl.socha23.memba.dao.mem.MemTodoStore
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class UpdateTodoSpec extends Specification {

    def "update a todo"() {
        given:
        def controller = new TodosController(todosOperations([
                [id: "1", text: "todo"],
        ]))

        when:
        def request = new UpdateTodoRequest();
        request.text  = "todo updated"
        controller.update("1", request).block()

        then:
        toList(controller.currentUserItems())[0].text == "todo updated"
    }

    private static TodosOperations todosOperations(List<Map> todos) {
        def store = new MemTodoStore();
        for (Map t : todos) {
            def todo = new BasicTodo()
            todo.setId(t.id)
            todo.setText(t.text)
            todo.setOwnerId(TestUserProvider.USER_ID);
            store.addTodo(todo);
        }
        return new TodosOperationsImpl(store, new TestUserProvider())
    }
}
