package pl.socha23.memba.dao.cache;

import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class CachingProfileStore implements ProfileStore {
    
    private Map<String, User> cachedProfiles = new HashMap<>();
    private ProfileStore store;

    public CachingProfileStore(ProfileStore store) {
        this.store = store;
    }

    @Override
    public Mono<User> updateProfile(User user) {
        if (needsToUpdate(user)) {
            return store
                    .updateProfile(user)
                    .map(this::putInCache);
        } else {
            return Mono.just(cachedProfiles.get(user.getId()));
        }
    }

    private User putInCache(User user) {
        cachedProfiles.put(user.getId(), user);
        return user;
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
    public Mono<? extends User> findProfileById(String id) {
        return store.findProfileById(id);
    }
}
