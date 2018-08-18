package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.Profile;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Mono;

public interface ProfileOperations {

    Mono<Profile> getCurrentUserProfile();
    Mono<User> updateProfile(User user);
    Mono<? extends User> findUserById(String id);
}
