package pl.socha23.memba.business.todos;

import pl.socha23.memba.business.Todo;
import reactor.core.publisher.Flux;

public interface TodoStore {
    Flux<Todo> listTodosByUserId(String userId);
}