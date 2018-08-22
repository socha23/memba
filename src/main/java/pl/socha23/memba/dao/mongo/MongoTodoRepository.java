package pl.socha23.memba.dao.mongo;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public interface MongoTodoRepository extends ReactiveCrudRepository<MongoTodoImpl, String> {

    Flux<MongoTodoImpl> findByOwnerIdsContaining(String ownerId);
}
