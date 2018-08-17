package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.model.BasicGroup
import pl.socha23.memba.business.api.model.BasicTodo
import spock.lang.Specification

class TodoOwnershipSpec extends Specification {
    def "adding todo to group copies group ownership"() {
        given:
        def ops = new TestOps()
            .withGroup(new BasicGroup(id: "g1", groupId: "root", ownerIds: ["A", "B"]))

        when:
        def newTodo = ops.todoOps
            .createTodo(new TestCreateUpdateTodo(groupId: "g1").toMono()).block()

        then:
        ops.findTodoById(newTodo.id).ownerIds == ["A", "B"] as Set

    }

    def "moving todo to group copies group ownership"() {
        given:
        def ops = new TestOps()
            .withGroup(new BasicGroup(id: "g1", groupId: "root", ownerIds: ["A", "B"]))
            .withTodo(new BasicTodo(id: "t1", groupId: "root", ownerIds: ["A"]))

        when:
        ops.todoOps
            .updateTodo("t1", new TestCreateUpdateTodo(groupId: "g1").toMono()).block()

        then:
        ops.findTodoById("t1").ownerIds == ["A", "B"] as Set


    }

    def "moving todo from group to root doesn't change ownership"() {
        given:
        def ops = new TestOps()
            .withGroup(new BasicGroup(id: "g1", groupId: "root", ownerIds: ["A", "B"]))
            .withTodo(new BasicTodo(id: "t1", groupId: "g1", ownerIds: ["A", "B"]))

        when:
        ops.todoOps
            .updateTodo("t1", new TestCreateUpdateTodo(groupId: "root").toMono()).block()

        then:
        ops.findTodoById("t1").ownerIds == ["A", "B"] as Set

    }



}
