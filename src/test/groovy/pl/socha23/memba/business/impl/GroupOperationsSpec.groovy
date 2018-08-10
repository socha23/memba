package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.model.CreateGroup
import pl.socha23.memba.dao.mem.MemGroupStore
import pl.socha23.memba.dao.mem.MemTodoStore
import reactor.core.publisher.Mono
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class GroupOperationsSpec extends Specification {

    def "adding a group"() {
        given:
        def groupStore = new MemGroupStore()
        def ops = new TodosOperationsImpl(new MemTodoStore(), groupStore, new TestUserProvider())

        when:
        ops.createGroup(withText("one")).block()
        ops.createGroup(withText("two")).block()

        then:
        toList(ops.listCurrentUserItems())*.text == ["two", "one"]
    }

    Mono<? extends CreateGroup> withText(String text) {
        Mono.just(new CreateGroup() {
            @Override
            String getText() {
                return text
            }

            @Override
            String getColor() {
                return null
            }
        })
    }
}
