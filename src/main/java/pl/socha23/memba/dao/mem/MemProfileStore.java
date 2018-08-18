package pl.socha23.memba.dao.mem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Item;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Profile("mem")
public class MemProfileStore implements ProfileStore {

    private Map<String, Instant> updateTimes = new HashMap<>();
    private Map<String, User> profiles = new HashMap<>();

    @Override
    public Mono<User> updateProfile(User user) {
        profiles.put(user.getId(), user);
        updateTimes.put(user.getId(), Instant.now());
        return Mono.just(user);
    }

    @Override
    public Mono<User> findProfileById(String id) {
        return profiles.containsKey(id) ? Mono.just(profiles.get(id)) : Mono.empty();
    }

    @Override
    public Flux<? extends User> listAllUsers() {
        return Flux.fromIterable(profiles.values());
    }

    public Instant getUpdateTime(String id) {
        return updateTimes.get(id);
    }
}
