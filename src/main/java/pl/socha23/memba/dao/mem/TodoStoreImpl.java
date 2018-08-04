package pl.socha23.memba.dao.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;

@Component
class TodoStoreImpl implements TodoStore {

    private int autoInc = 0;

    private Map<String, List<TodoImpl>> todosByUser = new HashMap<>();
    private Map<String, TodoImpl> todosById = new HashMap<>();

    @Override
    public Flux<Todo> listTodosByUserId(String userId) {
        return Flux.fromIterable(getUserTodos(userId));
    }

    @Override
    public Mono<Todo> createTodo(String userId, Mono<? extends CreateTodo> createTodo) {
        var result = newTodo(createTodo);

        getUserTodos(userId).add(0, result);
        todosById.put(result.getId(), result);

        return Mono.just(result);
    }

    @Override
    public Mono<Todo> findTodoById(String todoId) {
        return Mono.just(todosById.get(todoId));
    }

    @Override
    public void setCompleted(String todoId, boolean completed) {
        todosById.get(todoId).setCompleted(completed);
    }

    private TodoImpl newTodo(Mono<? extends CreateTodo> createTodo) {
        return new TodoImpl(UUID.randomUUID().toString(), createTodo.block().getText());
    };

    private List<TodoImpl> getUserTodos(String userId) {
        if (!todosByUser.containsKey(userId)) {
            createDefaultTodos(userId);
        }
        return todosByUser.get(userId);
    }

    private void createDefaultTodos(String userId) {
        var result = new ArrayList<TodoImpl>();
        result.add(todo("Papier"));
        result.add(todo("Mydło"));
        result.add(todo("Powidło"));

        todosByUser.put(userId, result);
        for (var todo : result) {
            todosById.put(todo.getId(), todo);
        }
    }

    private TodoImpl todo(String text) {
        return new TodoImpl("_auto" + autoInc++, text);
    }
}
