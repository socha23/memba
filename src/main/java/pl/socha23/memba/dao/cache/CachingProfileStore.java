package pl.socha23.memba.dao.cache;

import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class CachingProfileStore implements ProfileStore {
    
    private Map<String, User> cachedProfiles = new HashMap<>();
    private ProfileStore store;

    public CachingProfileStore(ProfileStore store) {
        this.store = store;
    }

    @Override
    public Mono<? extends User> updateUserData(UserData user) {
        if (needsToUpdate(user)) {
            return store
                    .updateUserData(user)
                    .map(this::putInCache);
        } else {
            return Mono.just(cachedProfiles.get(user.getId()));
        }
    }

    private User putInCache(User profile) {
        cachedProfiles.put(profile.getId(), profile);
        return profile;
    }

    private boolean needsToUpdate(UserData user) {
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
    public Mono<? extends User> findProfileById(String id) {
        return store.findProfileById(id);
    }

    @Override
    public Flux<? extends UserData> listAllUsers() {
        return store
                .listAllUsers();
    }

    @Override
    public Mono<? extends User> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        return store.updateRootOrder(id, todoOrder, groupOrder)
                .map(this::putInCache);
    }
}
