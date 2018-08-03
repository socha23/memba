package pl.socha23.memba.dao.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.dao.TodoStore;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;

@Component
class TodoStoreImpl implements TodoStore {

    private Map<String, List<Todo>> todos = new HashMap<>();

    @Override
    public Flux<Todo> listTodosByUserId(String userId) {
        return Flux.fromIterable(getUserTodos(userId));
    }

    @Override
    public Mono<Todo> createTodo(String userId, Mono<? extends CreateTodo> createTodo) {
        var result = newTodo(createTodo);
        getUserTodos(userId).add(0, result);
        return Mono.just(result);
    }

    private Todo newTodo(Mono<? extends CreateTodo> createTodo) {
        return new TodoImpl(UUID.randomUUID().toString(), createTodo.block().getText());
    };

    private List<Todo> getUserTodos(String userId) {
        if (!todos.containsKey(userId)) {
            todos.put(userId, createDefaultTodos(userId));
        }
        return todos.get(userId);
    }

    private List<Todo> createDefaultTodos(String userId) {
        var result = new ArrayList<Todo>();
        result.add(new TodoImpl(userId + "-1", "Papier"));
        result.add(new TodoImpl(userId + "-2", "Mydło"));
        result.add(new TodoImpl(userId + "-3", "Powidło"));
        return result;
    }
}
