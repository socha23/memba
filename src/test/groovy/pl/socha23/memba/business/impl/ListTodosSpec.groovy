package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.dao.TodoStore
import pl.socha23.memba.business.api.logic.CurrentUserProvider
import pl.socha23.memba.business.api.model.User
import pl.socha23.memba.business.impl.TodosOperationsImpl
import reactor.core.publisher.Flux
import spock.lang.Specification
import static pl.socha23.memba.FluxUtils.toList;

class ListTodosSpec extends Specification {

    def "list todos lists todos"() {
        given:
        def listTodos = new TodosOperationsImpl(todoStore([
                [id: "1", text: "foo"],
                [id: "2", text: "bar"]
        ]), new TestUserProvider())
        expect:
        toList(listTodos.listCurrentUserTodos()).size() == 2

    }

    private static TodoStore todoStore(List<Map> todos) {
        return [
                listTodosByOwnerId: {userId -> Flux.fromIterable(todos)}
        ] as TodoStore
    }
}
