package pl.socha23.memba.web.todos

import pl.socha23.memba.business.api.model.Group
import pl.socha23.memba.business.impl.TestCreateUpdateGroup
import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.GroupsController
import spock.lang.Specification

class UpdateGroupSpec extends Specification {

    def "update a group"() {
        given:
        def ops = new TestOps()
        Group g = ops.groupOps.createGroup(new TestCreateUpdateGroup(text: "original").toMono()).block()
        def controller = new GroupsController(ops.groupOps)

        when:
        controller.updateGroup(g.id, new TestCreateUpdateGroup(text: "changed")).block()

        then:
        def updated = ops.listGroups()[0]
        updated.text == "changed"
    }
}
