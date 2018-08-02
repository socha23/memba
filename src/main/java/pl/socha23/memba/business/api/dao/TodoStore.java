package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;

public interface TodoStore {
    Flux<Todo> listTodosByUserId(String userId);
}
