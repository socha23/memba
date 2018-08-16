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
        return repository.findByOwnerIdsContainingOrderByCreatedOnDesc(userId);
    }

    @Override
    public Mono<MongoTodoImpl> createTodo(Mono<? extends Todo> todo) {
        return updateTodo(todo);
    }

    @Override
    public Mono<MongoTodoImpl> updateTodo(Mono<? extends Todo> todo) {
        return todo
                .map(MongoTodoImpl::copy)
                .compose(t -> repository.saveAll(t).next());

    }

    @Override
    public Mono<Void> deleteTodo(String id) {
        return repository.deleteById(id);
    }

    @Override
    public Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId) {
        return template.updateMulti(
                new Query(Criteria.where("groupId").is(fromGroupId)),
                new Update().set("groupId", toGroupId),
                MongoTodoImpl.class
        ).then();
    }

}
