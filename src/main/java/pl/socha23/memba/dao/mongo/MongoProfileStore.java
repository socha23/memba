package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.List;

class MongoProfileStore implements ProfileStore {

    private ReactiveMongoTemplate template;

    MongoProfileStore(ReactiveMongoTemplate mongoTemplate) {
        this.template = mongoTemplate;
    }

    @Override
    public Mono<UserProfile> updateUserData(User user) {
        return template.findById(user.getId(), MongoUserProfileImpl.class)
                .defaultIfEmpty(MongoUserProfileImpl.from(user))
                .map(u -> u.updateUserData(user))
                .compose(template::save);

    }

    @Override
    public Mono<? extends UserProfile> findProfileById(String id) {
        return template.findById(id, MongoUserProfileImpl.class);
    }

    @Override
    public Flux<? extends User> listAllUsers() {
        return template.findAll(MongoUserProfileImpl.class);
    }

    @Override
    public Mono<? extends UserProfile> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        return template.findById(id, MongoUserProfileImpl.class)
                .map(u -> u.setRootOrder(todoOrder, groupOrder))
                .compose(template::save);
    }

    @Override
    public Mono<? extends UserProfile> addPushEndpoint(String id, String endpoint) {
        return template.findById(id, MongoUserProfileImpl.class)
                .map(u -> u.addPushEndpoint(endpoint))
                .compose(template::save);
    }

    @Override
    public Mono<? extends UserProfile> removePushEndpoints(String id, Collection<String> endpointsToRemove) {
        return template.findById(id, MongoUserProfileImpl.class)
                .map(u -> u.removePushEndpoints(endpointsToRemove))
                .compose(template::save);
    }


}
