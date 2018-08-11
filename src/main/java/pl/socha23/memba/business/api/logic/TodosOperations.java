package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.model.UpdateTodo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodosOperations {
    Flux<? extends Todo> listCurrentUserTodos();
    Mono<? extends Todo> createTodo(Mono<? extends CreateTodo> createTodo);
    Mono<? extends Todo> updateTodo(String todoId, Mono<? extends UpdateTodo> updateTodo);
    Mono<Void> deleteTodo(String todoId);
}
