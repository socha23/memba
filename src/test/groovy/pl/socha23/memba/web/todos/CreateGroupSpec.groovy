package pl.socha23.memba.web.todos

import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.GroupsController
import pl.socha23.memba.web.todos.model.CreateOrUpdateGroupRequest
import spock.lang.Specification

class CreateGroupSpec extends Specification {

    def "create a group"() {
        given:
        def ops = new TestOps()
        def controller = new GroupsController(ops.groupOps)

        when:
        def request = new CreateOrUpdateGroupRequest()
        request.text  = "my group"
        controller.addGroup(request).block()

        then:
        def group = ops.listGroups()[0]
        group.text == "my group"
    }

}
