package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodosOperations {
    Flux<Todo> listTodosByUserId(String userId);
    Mono<Todo> createTodo(String userId, Mono<? extends CreateTodo> createTodo);
}
