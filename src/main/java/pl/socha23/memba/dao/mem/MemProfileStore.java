package pl.socha23.memba.dao.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.dao.PushSubscriptionStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.model.BasicUserProfile;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.*;

@Component
@org.springframework.context.annotation.Profile("mem")
public class MemProfileStore implements ProfileStore, PushSubscriptionStore {

    private Map<String, Instant> updateTimes = new HashMap<>();
    private Map<String, BasicUserProfile> profiles = new HashMap<>();

    public MemProfileStore(CurrentUserProvider currentUserProvider) {
        profiles.put(currentUserProvider.getCurrentUserId(), BasicUserProfile.from(currentUserProvider.currentUser()));
    }

    @Override
    public Mono<? extends UserProfile> updateUserData(User user) {
        profiles.put(user.getId(), BasicUserProfile.from(user));
        updateTimes.put(user.getId(), Instant.now());
        return Mono.just(profiles.get(user.getId()));
    }

    @Override
    public Mono<? extends UserProfile> findProfileById(String id) {
        return Mono.justOrEmpty(profiles.get(id));
    }

    @Override
    public Flux<? extends UserProfile> listAllUsers() {
        return Flux.fromIterable(profiles.values());
    }

    @Override
    public Mono<? extends UserProfile> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        BasicUserProfile p = profiles.get(id);
        p.setRootGroupOrder(groupOrder);
        p.setRootTodoOrder(todoOrder);
        return Mono.just(p);
    }

    @Override
    public Collection<String> listPushSubscriptions(String userId) {
        if (profiles.get(userId) != null) {
            return profiles.get(userId).getPushEndpoints();
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public void addPushEndpoint(String id, String endpoint) {
        BasicUserProfile p = profiles.get(id);
        if (p != null) {
            p.getPushEndpoints().add(endpoint);
        }

    }

    @Override
    public void removePushEndpoints(String id, Collection<String> endpointsToRemove) {
        BasicUserProfile p = profiles.get(id);
        if (p != null) {
            p.getPushEndpoints().removeAll(endpointsToRemove);
        }

    }

    public Instant getUpdateTime(String id) {
        return updateTimes.get(id);
    }
}
