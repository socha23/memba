package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodoStore<T extends Todo> {
    
    Mono<T> findTodoById(String id);

    Flux<T> listTodosByOwnerId(String userId);

    Mono<T> createTodo(Mono<? extends Todo> todo);
    Mono<T> updateTodo(Mono<? extends Todo> todo);
}
