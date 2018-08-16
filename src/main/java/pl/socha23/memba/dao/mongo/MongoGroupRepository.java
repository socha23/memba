package pl.socha23.memba.dao.mongo;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public interface MongoGroupRepository extends ReactiveCrudRepository<MongoGroupImpl, String> {

    Flux<MongoGroupImpl> findByOwnerIdsContainingOrderByCreatedOnDesc(String ownerId);
}
