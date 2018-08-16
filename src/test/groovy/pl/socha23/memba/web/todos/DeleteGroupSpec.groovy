package pl.socha23.memba.web.todos

import pl.socha23.memba.business.impl.TestOps
import pl.socha23.memba.web.todos.controllers.GroupsController
import pl.socha23.memba.web.todos.model.CreateOrUpdateGroupRequest
import reactor.core.publisher.Mono
import spock.lang.Specification

class DeleteGroupSpec extends Specification {

    def "delete a group"() {
        given:
        def ops = new TestOps()
        def g1 = ops.groupOps.createGroup(Mono.just(new CreateOrUpdateGroupRequest(groupId: "root"))).block()
        def g2 = ops.groupOps.createGroup(Mono.just(new CreateOrUpdateGroupRequest(groupId: g1.id))).block()

        def controller = new GroupsController(ops.groupOps)

        when:
        controller.deleteGroup(g1.id).block()

        then:
        ops.listGroups().find {it.id == g2.id}.groupId == "root"
    }
}
