package pl.socha23.memba.business.todos;

import pl.socha23.memba.business.Todo;
import reactor.core.publisher.Flux;

import java.util.List;

/**
 *
 */
public interface TodosOperations {
    Flux<Todo> listTodosByUserId(String userId);
}
