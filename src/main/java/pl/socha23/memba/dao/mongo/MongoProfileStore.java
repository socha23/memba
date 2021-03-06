package pl.socha23.memba.dao.mongo;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.dao.PushSubscriptionStore;
import pl.socha23.memba.business.api.model.BasicPushSubscription;
import pl.socha23.memba.business.api.model.PushSubscription;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

class MongoProfileStore implements ProfileStore, PushSubscriptionStore {

    private ReactiveMongoTemplate reactiveTemplate;
    private MongoTemplate template;

    MongoProfileStore(ReactiveMongoTemplate reactiveMongoTemplate, MongoTemplate template) {
        this.reactiveTemplate = reactiveMongoTemplate;
        this.template = template;
    }

    @Override
    public Mono<UserProfile> updateUserData(User user) {
        return reactiveTemplate.findById(user.getId(), MongoUserProfileImpl.class)
                .defaultIfEmpty(MongoUserProfileImpl.from(user))
                .map(u -> u.updateUserData(user))
                .compose(reactiveTemplate::save);

    }

    @Override
    public Mono<? extends UserProfile> findProfileById(String id) {
        return reactiveTemplate.findById(id, MongoUserProfileImpl.class);
    }

    @Override
    public Flux<? extends User> listAllUsers() {
        return reactiveTemplate.findAll(MongoUserProfileImpl.class);
    }

    @Override
    public Mono<? extends UserProfile> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        return reactiveTemplate.findById(id, MongoUserProfileImpl.class)
                .map(u -> u.setRootOrder(todoOrder, groupOrder))
                .compose(reactiveTemplate::save);
    }

    @Override
    public Collection<? extends PushSubscription> listPushSubscriptions(String userId) {
        return Optional.ofNullable(getProfile(userId))
                .orElseThrow(() -> new RuntimeException("Profile not found"))
                .getPushSubscriptions();
    }

    @Override
    public void addPushSubscription(String id, PushSubscription endpoint) {
        var profile = getProfile(id);
        profile.getPushSubscriptions().add(BasicPushSubscription.copy(endpoint));
        template.save(profile);
    }

    private MongoUserProfileImpl getProfile(String id) {
        return template.findById(id, MongoUserProfileImpl.class);
    }

    @Override
    public void removePushSubscriptions(String id, Collection<PushSubscription> endpointsToRemove) {
        var profile = getProfile(id);
        profile.getPushSubscriptions().removeAll(endpointsToRemove);
        template.save(profile);
    }
}
