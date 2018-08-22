package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.model.BasicGroup
import pl.socha23.memba.business.api.model.BasicTodo
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
                .updateGroup("g2", new TestCreateUpdateGroup(groupId: "root", ownerIds: ["A", "B"]).toMono()).block()

        then:
        ops.findGroupById("g2").ownerIds == ["A", "B"] as Set

    }

    def "moving group to group copies children ownership"() {
        given:
        def ops = new TestOps()
                .withGroup(new BasicGroup(id: "dest", groupId: "root", ownerIds: ["A", "B"]))
                .withGroup(new BasicGroup(id: "src", groupId: "root"))
                .withGroup(new BasicGroup(id: "sub", groupId: "src"))
                .withTodo(new BasicTodo(id: "t1", groupId: "src"))
                .withTodo(new BasicTodo(id: "t2", groupId: "sub"))
        when:
        def result = ops.groupOps
                .updateGroup("src", new TestCreateUpdateGroup(groupId: "dest").toMono()).block()

        then:
        result != null

        ops.findGroupById("src").ownerIds == ["A", "B"] as Set
        ops.findGroupById("sub").ownerIds == ["A", "B"] as Set
        ops.findTodoById("t1").ownerIds == ["A", "B"] as Set
        ops.findTodoById("t2").ownerIds == ["A", "B"] as Set
    }

    def "changing group ownership changes children"() {
        given:
        def ops = new TestOps()
                .withGroup(new BasicGroup(id: "dest", groupId: "root", ownerIds: ["A", "B"]))
                .withGroup(new BasicGroup(id: "src", groupId: "root"))
                .withGroup(new BasicGroup(id: "sub", groupId: "src"))
                .withTodo(new BasicTodo(id: "t1", groupId: "src"))
                .withTodo(new BasicTodo(id: "t2", groupId: "sub"))
        when:
        def result = ops.groupOps
                .updateGroup("src", new TestCreateUpdateGroup(ownerIds: ["changed"]).toMono()).block()

        then:
        result != null

        ops.findGroupById("src").ownerIds == ["changed"] as Set
        ops.findGroupById("sub").ownerIds == ["changed"] as Set
        ops.findTodoById("t1").ownerIds == ["changed"] as Set
        ops.findTodoById("t2").ownerIds == ["changed"] as Set

    }
}
