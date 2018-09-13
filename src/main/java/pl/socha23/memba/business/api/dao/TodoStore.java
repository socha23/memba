package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Set;

public interface TodoStore<T extends Todo> {
    
    Mono<T> findTodoByIdReactive(String id);
    Todo findTodoById(String id);

    Flux<T> listTodosByOwnerId(String userId);

    Mono<T> createTodo(Mono<? extends Todo> todo);
    Mono<T> updateTodo(Mono<? extends Todo> todo);
    Mono<Void> deleteTodo(String id);

    /**
     * Update all the groups belonging to a given group and makes them parts of another one
     */
    Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId);

    Mono<Void> setOwnersInDirectGroupMembers(String groupId, Set<String> ownerIds);
}
