package pl.socha23.memba.dao.mongo;

import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.model.Group;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@Profile("mongo")
class MongoGroupStore implements GroupStore<MongoGroupImpl> {

    private MongoGroupRepository repository;
    private ReactiveMongoTemplate template;

    public MongoGroupStore(MongoGroupRepository repository, ReactiveMongoTemplate mongoTemplate) {
        this.repository = repository;
        this.template = mongoTemplate;
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

    @Override
    public Mono<Void> deleteGroup(String groupId) {
        return repository.deleteById(groupId);
    }

    @Override
    public Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId) {
        return template.updateMulti(
                new Query(Criteria.where("groups.groupId").is(fromGroupId)),
                new Update().set("groupId", toGroupId),
                Void.class
        ).then();
    }
}
