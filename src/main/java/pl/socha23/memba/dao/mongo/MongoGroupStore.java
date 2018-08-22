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

import java.util.Set;

import static org.springframework.data.mongodb.core.query.Criteria.where;

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
        return repository.findByOwnerIdsContaining(userId);
    }

    @Override
    public Flux<MongoGroupImpl> listSubGroups(String groupId) {
        return find(inGroup(groupId));
    }

    @Override
    public Mono<MongoGroupImpl> createGroup(Mono<? extends Group> group) {
        return updateGroup(group);
    }

    @Override
    public Mono<MongoGroupImpl> updateGroup(Mono<? extends Group> group) {
        return group
                        .map(MongoGroupImpl::copy)
                        .transform(t -> repository.saveAll(t).next()
                        );
    }

    @Override
    public Mono<Void> deleteGroup(String groupId) {
        return repository.deleteById(groupId);
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
        return update(inGroup(groupId), update);
    }

    private Criteria inGroup(String groupId) {
        return where("groupId").is(groupId);
    }

    private Mono<Void> update(Criteria criteria, Update update) {
        return template.updateMulti(new Query(criteria), update, MongoGroupImpl.class).then();
    }

    private Flux<MongoGroupImpl> find(Criteria criteria) {
        return template.find(new Query(criteria), MongoGroupImpl.class);
    }


}
