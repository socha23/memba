package pl.socha23.memba.dao.cache;

import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;

public class CachingProfileStore implements ProfileStore {
    
    private Map<String, UserProfile> cachedProfiles = new HashMap<>();
    private ProfileStore store;

    public CachingProfileStore(ProfileStore store) {
        this.store = store;
    }

    @Override
    public Mono<? extends UserProfile> updateUserData(User user) {
        if (needsToUpdate(user)) {
            return store
                    .updateUserData(user)
                    .map(this::putInCache);
        } else {
            return Mono.just(cachedProfiles.get(user.getId()));
        }
    }

    private UserProfile putInCache(UserProfile profile) {
        cachedProfiles.put(profile.getId(), profile);
        return profile;
    }

    private boolean needsToUpdate(User user) {
        if (!cachedProfiles.containsKey(user.getId())) {
            return true;
        }
        var cached = cachedProfiles.get(user.getId());
        return !(
                Objects.equals(cached.getFirstName(), user.getFirstName())
                && Objects.equals(cached.getFullName(), user.getFullName())
                && Objects.equals(cached.getPictureUrl(), user.getPictureUrl())
        );
    }

    @Override
    public Mono<? extends UserProfile> findProfileById(String id) {
        return store.findProfileById(id);
    }

    @Override
    public Flux<? extends User> listAllUsers() {
        return store
                .listAllUsers();
    }

    @Override
    public Mono<? extends UserProfile> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        return store.updateRootOrder(id, todoOrder, groupOrder)
                .map(this::putInCache);
    }

    @Override
    public Mono<? extends UserProfile> addPushEndpoint(String id, String endpoint) {
        return store.addPushEndpoint(id, endpoint)
                .map(this::putInCache);
    }

    @Override
    public Mono<? extends UserProfile> removePushEndpoints(String id, Collection<String> endpointsToRemove) {
        return store.removePushEndpoints(id, endpointsToRemove)
                .map(this::putInCache);
    }
}
