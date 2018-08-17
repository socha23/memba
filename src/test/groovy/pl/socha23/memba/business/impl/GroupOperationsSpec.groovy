package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.model.BasicTodo
import pl.socha23.memba.business.api.model.Group
import reactor.core.publisher.Mono
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class GroupOperationsSpec extends Specification {

    def "adding a group"() {
        given:
        def ops = new TestOps().groupOps

        when:
        ops.createGroup(TestCreateUpdateGroup.monoWithText("one")).block()
        ops.createGroup(TestCreateUpdateGroup.monoWithText("two")).block()

        then:
        toList(ops.listCurrentUserGroups())*.text == ["two", "one"]
    }

    def "updating a group"() {
        given:
        def ops = new TestOps().groupOps

        when:
        Group g = ops.createGroup(new TestCreateUpdateGroup()
                .withText("original")
                .withColor("red")
                .toMono()
        ).block()
        ops.updateGroup(g.id, TestCreateUpdateGroup.monoWithText("modified")).block()

        then:
        def changedGroup = toList(ops.listCurrentUserGroups())[0]
        changedGroup.text == "modified"
        changedGroup.color == "red"
    }

    def "deleting a group"() {
        given:
        def ops = new TestOps().groupOps
        Group g = ops.createGroup(new TestCreateUpdateGroup()
                .withText("original")
                .withColor("red")
                .toMono()
        ).block()

        when:
        ops.deleteGroup(g.id).block()

        then:
        toList(ops.listCurrentUserGroups()).size() == 0
    }

    def "deleting a group moves its children to supergroup"() {
        given:
        def ops = new TestOps()

        def g1 = ops.groupOps.createGroup(new TestCreateUpdateGroup(groupId: "root", text: "g1").toMono()).block()
        def g1a = ops.groupOps.createGroup(new TestCreateUpdateGroup(groupId: g1.id, text: "g1a").toMono()).block()
        def g2 = ops.groupOps.createGroup(new TestCreateUpdateGroup(groupId: "root", text: "g2").toMono()).block()
        def g2a = ops.groupOps.createGroup(new TestCreateUpdateGroup(groupId: g2.id, text: "g1a").toMono()).block()
        def t = ops.todoStore.createTodo(Mono.just(new BasicTodo(groupId: "root", text: "t"))).block()
        def t1 = ops.todoStore.createTodo(Mono.just(new BasicTodo(groupId: g1.id, text: "t1"))).block()
        def t2 = ops.todoStore.createTodo(Mono.just(new BasicTodo(groupId: g2.id, text: "t2"))).block()

        when:
        ops.groupOps.deleteGroup(g1.id).block()

        then:
        // we deleted g1. g1a and t1 should move to root. t, g2, g2a and t2 shouldn't change
        ops.groupStore.findGroupById(g1.id).block() == null

        ops. groupStore.findGroupById(g1a.id).block().groupId == 'root'
        ops. todoStore.findTodoById(t1.id).block().groupId == 'root'

        ops. todoStore.findTodoById(t.id).block().groupId == 'root'
        ops. groupStore.findGroupById(g2.id).block().groupId == 'root'
        ops. groupStore.findGroupById(g2a.id).block().groupId == g2.id
        ops. todoStore.findTodoById(t2.id).block().groupId == g2.id
    }

}
