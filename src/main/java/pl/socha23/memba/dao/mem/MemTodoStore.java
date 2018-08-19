package pl.socha23.memba.dao.mem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Item;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Profile("mem")
public class MemTodoStore implements TodoStore<BasicTodo> {

    private int autoInc = 0;
    private Map<String, BasicTodo> todosById = new HashMap<>();

    @Override
    public Mono<BasicTodo> findTodoById(String id) {
        return Mono.justOrEmpty(todosById.get(id));
    }

    @Override
    public Flux<BasicTodo> listTodosByOwnerId(String userId) {
        return Flux.fromIterable(getUserTodos(userId));
    }

    @Override
    public Mono<BasicTodo> createTodo(Mono<? extends Todo> todo) {
        return todo
                .map(this::addTodo);
    }

    @Override
    public Mono<BasicTodo> updateTodo(Mono<? extends Todo> todo) {
        return todo.map(this::doUpdateTodo);
    }

    @Override
    public Mono<Void> deleteTodo(String id) {
        todosById.remove(id);
        return Mono.empty();
    }

    private BasicTodo doUpdateTodo(Todo todo) {
        var result = BasicTodo.copy(todo);
        todosById.put(todo.getId(), result);
        return result;
    }

    private List<BasicTodo> getUserTodos(String userId) {
        return todosById.values().stream()
                .filter(t -> t.getOwnerIds().contains(userId))
                .sorted(Comparator.comparing(Item::getId).reversed())
                .collect(Collectors.toList());
    }

    private BasicTodo addTodo(Todo todo) {
        var newTodo = BasicTodo.copy(todo);

        if (newTodo.getId() == null) {
            newTodo.setId(autoinc());
        }

        todosById.put(newTodo.getId(), newTodo);
        return newTodo;
    }

    private String autoinc() {
        return "_auto" + autoInc++;
    }

    @Override
    public Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId) {
        todosById.values().stream()
                .filter(t -> fromGroupId.equals(t.getGroupId()))
                .forEach(t -> t.setGroupId(toGroupId));
        return Mono.empty();
    }

    @Override
    public Mono<Void> setOwnersInDirectGroupMembers(String groupId, Set<String> ownerIds) {
        todosById.values().stream()
                .filter(t -> t.getGroupId().equals(groupId))
                .forEach(t -> t.setOwnerIds(ownerIds));
        return Mono.empty();
    }

}
