package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProfileStore {
    Mono<? extends User> updateUserData(UserData user);
    Mono<? extends User> findProfileById(String id);
    Flux<? extends UserData> listAllUsers();
    Mono<? extends User> updateRootOrder(String id, List<String> todoOrder, List<String> groupOrder);
}
