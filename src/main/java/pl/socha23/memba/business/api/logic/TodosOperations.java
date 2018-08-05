package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.model.UpdateTodo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodosOperations {
    Flux<Todo> listCurrentUserTodos();
    Mono<Todo> createTodo(Mono<? extends CreateTodo> createTodo);
    Mono<Todo> updateTodo(String todoId, Mono<? extends UpdateTodo> updateTodo);
}
