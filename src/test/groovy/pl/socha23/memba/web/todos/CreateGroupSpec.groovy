package pl.socha23.memba.web.todos


import pl.socha23.memba.business.api.logic.TodosOperations
import pl.socha23.memba.business.api.model.BasicTodo
import pl.socha23.memba.business.impl.TestUserProvider
import pl.socha23.memba.business.impl.TodosOperationsImpl
import pl.socha23.memba.dao.mem.MemGroupStore
import pl.socha23.memba.dao.mem.MemTodoStore
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class CreateGroupSpec extends Specification {

    def "create a group"() {
        given:
        def controller = new TodosController(new TodosOperationsImpl(new MemTodoStore(), new MemGroupStore(), new TestUserProvider()))

        when:
        def request = new CreateGroupRequest();
        request.text  = "my group"
        request.groupId = "ggg"
        controller.addGroup(request).block()

        then:
        def group = toList(controller.currentUserItems())[0]
        group.text == "my group"
        group.groupId == "ggg"
    }

}
