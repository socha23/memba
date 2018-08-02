package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;

public interface TodosOperations {
    Flux<Todo> listTodosByUserId(String userId);
}
