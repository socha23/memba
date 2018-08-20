package pl.socha23.memba.dao.mem;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.model.BasicUser;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@org.springframework.context.annotation.Profile("mem")
public class MemProfileStore implements ProfileStore {

    private Map<String, Instant> updateTimes = new HashMap<>();
    private Map<String, BasicUser> profiles = new HashMap<>();

    public MemProfileStore(CurrentUserProvider currentUserProvider) {
        profiles.put(currentUserProvider.getCurrentUserId(), BasicUser.from(currentUserProvider.currentUser()));
    }

    @Override
    public Mono<? extends User> updateUserData(UserData user) {
        profiles.put(user.getId(), BasicUser.from(user));
        updateTimes.put(user.getId(), Instant.now());
        return Mono.just(profiles.get(user.getId()));
    }

    @Override
    public Mono<? extends User> findProfileById(String id) {
        BasicUser p = profiles.get(id);
        if (p == null) {
            return Mono.empty();
        } else {
            return listAllUsers()
                    .filter(u -> !u.getId().equals(id))
                    .collectList()
                    .map(users -> {
                        p.setFriends(users);
                        return p;
                    });
        }
    }

    @Override
    public Flux<? extends User> listAllUsers() {
        return Flux.fromIterable(profiles.values());
    }

    @Override
    public Mono<? extends User> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder) {
        BasicUser p = profiles.get(id);
        p.setRootGroupOrder(groupOrder);
        p.setRootTodoOrder(todoOrder);
        return Mono.just(p);
    }

    public Instant getUpdateTime(String id) {
        return updateTimes.get(id);
    }
}
