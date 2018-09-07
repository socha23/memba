package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;
import pl.socha23.memba.business.api.model.UserProfileWithFriends;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ProfileOperations {

    Mono<? extends UserProfileWithFriends> getCurrentUserProfile();
    Mono<? extends UserProfile> updateProfile(User user);
    Mono<? extends UserProfile> findUserById(String id);
    Mono<? extends UserProfile> updateRootOrders(String userId, List<String> todoOrder, List<String> groupOrder);
    Mono<? extends UserProfile> addCurrentUserPushEndpoint(String endpoint);
}
