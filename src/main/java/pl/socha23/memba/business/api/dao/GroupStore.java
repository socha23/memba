package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupStore<T extends Group> {
    
    Mono<T> findGroupById(String id);

    Flux<T> listGroupsByOwnerId(String userId);

    Mono<T> createGroup(Mono<? extends Group> group);
}
