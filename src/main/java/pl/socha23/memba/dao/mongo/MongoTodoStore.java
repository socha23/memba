package pl.socha23.memba.dao.mongo;

import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import static org.springframework.data.mongodb.core.query.Criteria.*;

import java.util.Set;

@Component
@Profile("mongo")
class MongoTodoStore implements TodoStore<MongoTodoImpl> {

    private MongoTodoRepository repository;
    private ReactiveMongoTemplate template;

    public MongoTodoStore(MongoTodoRepository repository, ReactiveMongoTemplate template) {
        this.repository = repository;
        this.template = template;
    }

    @Override
    public Mono<MongoTodoImpl> findTodoById(String id) {
        return repository.findById(id);
    }

    @Override
    public Flux<MongoTodoImpl> listTodosByOwnerId(String userId) {
        return repository.findByOwnerIdsContaining(userId);
    }

    @Override
    public Mono<MongoTodoImpl> createTodo(Mono<? extends Todo> todo) {
        return updateTodo(todo);
    }

    @Override
    public Mono<MongoTodoImpl> updateTodo(Mono<? extends Todo> todo) {
        return todo
                .map(MongoTodoImpl::copy)
                .transform(t -> repository.saveAll(t).next());

    }

    @Override
    public Mono<Void> deleteTodo(String id) {
        return repository.deleteById(id);
    }

    @Override
    public Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId) {
        return updateAllInGroup(fromGroupId, new Update().set("groupId", toGroupId));
    }

    @Override
    public Mono<Void> setOwnersInDirectGroupMembers(String groupId, Set<String> ownerIds) {
        return updateAllInGroup(groupId, new Update().set("ownerIds", ownerIds));
    }

    private Mono<Void> updateAllInGroup(String groupId, Update update) {
        return update(where("groupId").is(groupId), update);
    }

    private Mono<Void> update(Criteria criteria, Update update) {
        return template.updateMulti(new Query(criteria), update, MongoTodoImpl.class).then();
    }

}
