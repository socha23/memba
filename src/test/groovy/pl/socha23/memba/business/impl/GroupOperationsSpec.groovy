package pl.socha23.memba.business.impl


import pl.socha23.memba.business.api.model.Group
import pl.socha23.memba.dao.mem.MemGroupStore
import pl.socha23.memba.dao.mem.MemTodoStore
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class GroupOperationsSpec extends Specification {

    def "adding a group"() {
        given:
        def groupStore = new MemGroupStore()
        def ops = new GroupsOperationsImpl(new MemTodoStore(), groupStore, new TestUserProvider())

        when:
        ops.createGroup(TestCreateUpdateGroup.monoWithText("one")).block()
        ops.createGroup(TestCreateUpdateGroup.monoWithText("two")).block()

        then:
        toList(ops.listCurrentUserGroups())*.text == ["two", "one"]
    }

    def "updating a group"() {
        given:
        def groupStore = new MemGroupStore()
        def ops = new GroupsOperationsImpl(new MemTodoStore(), groupStore, new TestUserProvider())

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


}
