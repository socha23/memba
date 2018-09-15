package pl.socha23.memba.dao.mongo;

import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Set;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Component
@Profile("mongo")
class MongoTodoStore implements TodoStore<MongoTodoImpl> {

    private ReactiveMongoTodoRepository reactiveRepository;
    private ReactiveMongoTemplate reactiveTemplate;
    private MongoTodoRepository repository;
    private MongoTemplate template;

    public MongoTodoStore(ReactiveMongoTodoRepository reactiveRepository, ReactiveMongoTemplate reactiveTemplate,
                          MongoTodoRepository repository, MongoTemplate template) {
        this.reactiveRepository = reactiveRepository;
        this.reactiveTemplate = reactiveTemplate;
        this.repository = repository;
        this.template = template;
    }

    @Override
    public Mono<MongoTodoImpl> findTodoByIdReactive(String id) {
        return reactiveRepository.findById(id);
    }

    @Override
    public Todo findTodoById(String id) {
        return template.findById(id, MongoTodoImpl.class);
    }

    @Override
    public Flux<MongoTodoImpl> listTodosByOwnerId(String userId) {
        return reactiveRepository.findByOwnerIdsContaining(userId);
    }

    @Override
    public Mono<MongoTodoImpl> createTodo(Mono<? extends Todo> todo) {
        return updateTodo(todo);
    }

    @Override
    public Mono<MongoTodoImpl> updateTodo(Mono<? extends Todo> todo) {
        return todo
                .map(MongoTodoImpl::copy)
                .transform(t -> reactiveRepository.saveAll(t).next());

    }

    @Override
    public Mono<Void> deleteTodo(String id) {
        return reactiveRepository.deleteById(id);
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
        return reactiveTemplate.updateMulti(new Query(criteria), update, MongoTodoImpl.class).then();
    }
}
