package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.logic.TodosNeedingNotificationProvider;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;

import java.time.Instant;
import java.util.Collection;

@Component
public interface MongoTodoRepository extends CrudRepository<MongoTodoImpl, String>, TodosNeedingNotificationProvider {

    @Override
    @Query("{'completed': false, 'when': {$gte: ?0, $lt: ?1}}")
    Collection<? extends Todo> listTodosRequiringNotificationInPeriod(Instant fromInclusive, Instant toExclusive);

}
