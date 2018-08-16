package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.model.BasicGroup
import pl.socha23.memba.business.api.model.BasicTodo
import pl.socha23.memba.business.api.model.Todo
import spock.lang.Specification

import static pl.socha23.memba.FluxUtils.toList

class TodoOperationsSpec extends Specification {

    def "adding a todo"() {
        given:
        def ops = new TestOps().todoOps

        when:
        ops.createTodo(TestCreateUpdateTodo.monoWithText("one")).block()
        ops.createTodo(TestCreateUpdateTodo.monoWithText("two")).block()

        then:
        toList(ops.listCurrentUserTodos())*.text == ["two", "one"]
    }

    def "updating a todo"() {
        given:
        def ops = new TestOps().todoOps

        when:
        Todo t = ops.createTodo(new TestCreateUpdateTodo()
                .withText("original")
                .withColor("red")
                .toMono()
        ).block()
        ops.updateTodo(t.id, TestCreateUpdateTodo.monoWithText("modified")).block()

        then:
        def changedTodo = toList(ops.listCurrentUserTodos())[0]
        changedTodo.text == "modified"
        changedTodo.color == "red"
    }

    def "deleting a todo"() {
        given:
        def ops = new TestOps().todoOps
        Todo t1 = ops.createTodo(TestCreateUpdateTodo.monoWithText("one")).block()
        Todo t2 = ops.createTodo(TestCreateUpdateTodo.monoWithText("two")).block()

        when:
        ops.deleteTodo(t1.id)

        then:
        toList(ops.listCurrentUserTodos())*.text == [t2.text]
    }

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
