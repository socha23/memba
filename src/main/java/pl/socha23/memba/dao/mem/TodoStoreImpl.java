package pl.socha23.memba.dao.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Component
class TodoStoreImpl implements TodoStore {

    private int autoInc = 0;

    private Set<String> seenUserIds = new HashSet<>();
    private Map<String, Todo> todosById = new HashMap<>();

    @Override
    public Mono<Todo> findTodoById(String id) {
        return Mono.justOrEmpty(todosById.get(id));
    }

    @Override
    public Flux<Todo> listTodosByUserId(String userId) {
        return Flux.fromIterable(getUserTodos(userId));
    }

    @Override
    public Mono<Todo> createTodo(Mono<? extends Todo> todo) {
        return todo.map(this::addTodo);
    }

    @Override
    public Mono<Todo> updateTodo(Mono<? extends Todo> todo) {
        return todo.map(this::doUpdateTodo);
    }

    private Todo doUpdateTodo(Todo todo) {
        return todosById.put(todo.getId(), todo);
    }

    private List<Todo> getUserTodos(String userId) {
        if (!seenUserIds.contains(userId)) {
            createDefaultTodos(userId);
        }

        return todosById.values().stream()
                .filter(t -> t.getOwnerId().equals(userId))
                .sorted(Comparator.comparing(Todo::getId).reversed())
                .collect(Collectors.toList());
    }

    private void createDefaultTodos(String userId) {
        addTodo(userId, "Papier");
        addTodo(userId, "Mydło");
        addTodo(userId, "Powidło");
        seenUserIds.add(userId);
    }

    private Todo addTodo(Todo todo) {
        var newTodo = BasicTodo.copy(todo);

        if (newTodo.getId() == null) {
            newTodo.setId(autoinc());
        }

        todosById.put(newTodo.getId(), newTodo);
        return newTodo;
    }

    private Todo addTodo(String userId, String text) {
        var todo = new BasicTodo();
        todo.setOwnerId(userId);
        todo.setText(text);
        return addTodo(todo);
    }

    private String autoinc() {
        return "_auto" + autoInc++;
    }
}
