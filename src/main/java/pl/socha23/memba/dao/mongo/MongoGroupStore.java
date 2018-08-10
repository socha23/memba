package pl.socha23.memba.dao.mongo;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.model.Group;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@Profile("mongo")
class MongoGroupStore implements GroupStore<MongoGroupImpl> {

    private MongoGroupRepository repository;

    public MongoGroupStore(MongoGroupRepository repository) {
        this.repository = repository;
    }

    @Override
    public Mono<MongoGroupImpl> findGroupById(String id) {
        return repository.findById(id);
    }

    @Override
    public Flux<MongoGroupImpl> listGroupsByOwnerId(String userId) {
        return repository.findByOwnerIdOrderByCreatedOnDesc(userId);
    }

    @Override
    public Mono<MongoGroupImpl> createGroup(Mono<? extends Group> group) {
        return updateGroup(group);
    }

    @Override
    public Mono<MongoGroupImpl> updateGroup(Mono<? extends Group> group) {
        return group
                        .map(MongoGroupImpl::copy)
                        .compose(t -> repository.saveAll(t).next()
                        );

    }
}
