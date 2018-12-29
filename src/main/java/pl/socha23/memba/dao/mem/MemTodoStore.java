package pl.socha23.memba.dao.mem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.Item;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.Collection;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Profile("mem")
public class MemTodoStore implements TodoStore<Todo> {

    private int autoInc = 0;
    private Map<String, Todo> todosById = new HashMap<>();

    @Override
    public Mono<Todo> findTodoByIdReactive(String id) {
        return Mono.justOrEmpty(todosById.get(id));
    }

    @Override
    public Todo findTodoById(String id) {
        return todosById.get(id);
    }

    @Override
    public Flux<Todo> listTodosByOwnerId(String userId) {
        return Flux.fromIterable(getUserTodos(userId));
    }

    @Override
    public Mono<Todo> createTodo(Mono<? extends Todo> todo) {
        return todo
                .map(this::createTodo);
    }

    @Override
    public Mono<Todo> updateTodo(Mono<? extends Todo> todo) {
        return todo.map(this::updateTodo);
    }

    @Override
    public Mono<Void> deleteTodo(String id) {
        todosById.remove(id);
        return Mono.empty();
    }

    @Override
    public Todo updateTodo(Todo todo) {
        var result = Todo.copy(todo);
        todosById.put(todo.getId(), result);
        return result;
    }

    private List<Todo> getUserTodos(String userId) {
        return todosById.values().stream()
                .filter(t -> t.getOwnerIds().contains(userId))
                .sorted(Comparator.comparing(Item::getId).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Todo createTodo(Todo todo) {
        var newTodo = Todo.copy(todo);

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

    @Override
    public Collection<Todo> listTodosWithUnsentRemindersInPeriod(Instant fromInclusive, Instant toExclusive) {
        return todosById.values().stream()
            .filter(t -> !t.isCompleted() && t.hasUnsentRemindersInPeriod(fromInclusive, toExclusive))
            .collect(Collectors.toList());
    }

}
