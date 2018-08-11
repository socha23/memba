package pl.socha23.memba.web.todos


import pl.socha23.memba.web.todos.controllers.GroupsController
import pl.socha23.memba.web.todos.model.CreateUpdateGroupRequest
import spock.lang.Specification

class CreateGroupSpec extends Specification {

    def "create a group"() {
        given:
        def ops = new TestTodoOps()
        def controller = new GroupsController(ops)

        when:
        def request = new CreateUpdateGroupRequest()
        request.text  = "my group"
        request.groupId = "ggg"
        controller.addGroup(request).block()

        then:
        def group = ops.listGroups()[0]
        group.text == "my group"
        group.groupId == "ggg"
    }

}
