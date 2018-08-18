package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProfileStore {
    Mono<User> updateProfile(User user);
    Mono<? extends User> findProfileById(String id);
    Flux<? extends User> listAllUsers();
}
