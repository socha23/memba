package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProfileOperations {

    Mono<? extends User> getCurrentUser();
    Mono<? extends User> updateProfile(UserData user);
    Mono<? extends User> findUserById(String id);
    Mono<? extends User> updateRootOrders(String userId, List<String> todoOrder, List<String> groupOrder);
}
