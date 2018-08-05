package pl.socha23.memba.dao.mongo;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Profile("mongo")
class MongoTodoStore implements TodoStore<MongoTodoImpl> {

    private MongoTodoRepository repository;

    public MongoTodoStore(MongoTodoRepository repository) {
        this.repository = repository;
    }

    @Override
    public Mono<MongoTodoImpl> findTodoById(String id) {
        return repository.findById(id);
    }

    @Override
    public Flux<MongoTodoImpl> listTodosByOwnerId(String userId) {
        return repository.findByOwnerIdOrderByCreatedDateDesc(userId);
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
}
