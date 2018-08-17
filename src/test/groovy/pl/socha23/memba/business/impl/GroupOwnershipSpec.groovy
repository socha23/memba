package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.model.BasicGroup
import spock.lang.Specification

class GroupOwnershipSpec extends Specification {

    def "adding group to group copies group ownership"() {
        given:
        def ops = new TestOps()
            .withGroup(new BasicGroup(id: "g1", groupId: "root", ownerIds: ["A", "B"]))

        when:
        def newGroup = ops.groupOps
            .createGroup(new TestCreateUpdateGroup(groupId: "g1").toMono()).block()

        then:
        ops.findGroupById(newGroup.id).ownerIds == ["A", "B"] as Set

    }

    def "moving group to group copies group ownership"() {
        given:
        def ops = new TestOps()
            .withGroup(new BasicGroup(id: "g1", groupId: "root", ownerIds: ["A", "B"]))
            .withGroup(new BasicGroup(id: "g2", groupId: "root", ownerIds: ["A"]))

        when:
        ops.groupOps
            .updateGroup("g2", new TestCreateUpdateGroup(groupId: "g1").toMono()).block()

        then:
        ops.findGroupById("g2").ownerIds == ["A", "B"] as Set


    }

    def "moving group from group to root doesn't change ownership"() {
        given:
        def ops = new TestOps()
            .withGroup(new BasicGroup(id: "g1", groupId: "root", ownerIds: ["A", "B"]))
            .withGroup(new BasicGroup(id: "g2", groupId: "g1", ownerIds: ["A", "B"]))

        when:
        ops.groupOps
            .updateGroup("g2", new TestCreateUpdateGroup(groupId: "root").toMono()).block()

        then:
        ops.findGroupById("g2").ownerIds == ["A", "B"] as Set

    }


}
