package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.UserProfile;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProfileStore {
    Mono<? extends UserProfile> updateUserData(User user);
    Mono<? extends UserProfile> findProfileById(String id);
    Flux<? extends User> listAllUsers();
    Mono<? extends UserProfile> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder);
}
