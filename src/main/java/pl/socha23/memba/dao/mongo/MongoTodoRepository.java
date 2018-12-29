package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.model.Todo;

import java.time.Instant;
import java.util.Collection;

@Component
public interface MongoTodoRepository extends CrudRepository<MongoTodoImpl, String> {

    @Query("{'completed': false, 'reminders': {$elemMatch: {when: {$gte: ?0, $lt: ?1}, notificationSentOn: null}}}")
    Collection<MongoTodoImpl> listTodosWithUnsentRemindersInPeriod(Instant fromInclusive, Instant toExclusive);

}
