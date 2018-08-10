package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.dao.GroupStore
import pl.socha23.memba.business.api.dao.TodoStore
import reactor.core.publisher.Flux
import spock.lang.Specification
import static pl.socha23.memba.FluxUtils.toList;

class ListItemsSpec extends Specification {

    def "list items lists todos"() {
        given:
        def listTodos = new TodosOperationsImpl(todoStore([
                [id: "1", text: "foo"],
                [id: "2", text: "bar"]
        ]), groupStore([]), new TestUserProvider())
        expect:
        toList(listTodos.listCurrentUserItems()).size() == 2

    }

    def "list items lists groups"() {
        given:
        def listGroups = new TodosOperationsImpl(todoStore([]), groupStore([
                [id: "1", text: "foo"],
                [id: "2", text: "bar"]
        ]), new TestUserProvider())
        expect:
        toList(listGroups.listCurrentUserItems()).size() == 2
    }

    def "list items lists both items and groups"() {
        given:
        def todos = [[id: "t1"], [id: "t2"]]
        def groups = [[id: "g1"], [id: "g2"]]

        def listGroups = new TodosOperationsImpl(todoStore(todos), groupStore(groups), new TestUserProvider())
        expect:

        toList(listGroups.listCurrentUserItems())*.id == ["g1", "g2", "t1", "t2"]
    }



    private static TodoStore todoStore(List<Map> todos) {
        return [
                listTodosByOwnerId: {userId -> Flux.fromIterable(todos)}
        ] as TodoStore
    }

    private static GroupStore groupStore(List<Map> groups) {
        return [
                listGroupsByOwnerId: {userId -> Flux.fromIterable(groups)}
        ] as GroupStore
    }

}
