package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodoStore {
    
    Mono<Todo> findTodoById(String id);

    Flux<Todo> listTodosByUserId(String userId);

    Mono<Todo> createTodo(Mono<? extends Todo> todo);
    Mono<Todo> updateTodo(Mono<? extends Todo> todo);
}
