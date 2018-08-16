package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.CreateOrUpdateTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodosOperations {
    Flux<? extends Todo> listCurrentUserTodos();
    Mono<? extends Todo> createTodo(Mono<? extends CreateOrUpdateTodo> createTodo);
    Mono<? extends Todo> updateTodo(String todoId, Mono<? extends CreateOrUpdateTodo> updateTodo);
    Mono<Void> deleteTodo(String todoId);
}
