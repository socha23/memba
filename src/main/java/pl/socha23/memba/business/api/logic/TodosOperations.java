package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TodosOperations {
    Flux<? extends Item> listCurrentUserItems();

    Mono<? extends Todo> createTodo(Mono<? extends CreateTodo> createTodo);
    Mono<? extends Todo> updateTodo(String todoId, Mono<? extends UpdateTodo> updateTodo);

    Mono<? extends Group> createGroup(Mono<? extends CreateGroup> createGroup);
}
