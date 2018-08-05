package pl.socha23.memba.dao.mem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    private BasicTodo doUpdateTodo(Todo todo) {
        return todosById.put(todo.getId(), BasicTodo.copy(todo));
    }

    private List<BasicTodo> getUserTodos(String userId) {
        return todosById.values().stream()
                .filter(t -> t.getOwnerId().equals(userId))
                .sorted(Comparator.comparing(Todo::getId).reversed())
                .collect(Collectors.toList());
    }

    public BasicTodo addTodo(Todo todo) {
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
}
