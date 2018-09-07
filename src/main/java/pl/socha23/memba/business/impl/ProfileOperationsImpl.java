package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.ProfileOperations;
import pl.socha23.memba.business.api.model.BasicUserProfileWithFriends;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserProfile;
import pl.socha23.memba.business.api.model.UserProfileWithFriends;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class ProfileOperationsImpl implements ProfileOperations {

    private ProfileStore profileStore;
    private CurrentUserProvider currentUserProvider;

    public ProfileOperationsImpl(ProfileStore profileStore, CurrentUserProvider currentUserProvider) {

        this.profileStore = profileStore;
        this.currentUserProvider = currentUserProvider;
    }

    @Override
    public Mono<? extends UserProfileWithFriends> getCurrentUserProfile() {
        String id = currentUserProvider.currentUser().getId();

        var friends = profileStore
                .listAllUsers()
                .filter(u -> !u.getId().equals(id))
                .collectList();
        var profile = profileStore.findProfileById(id);

        return profile
                .zipWith(friends)
                .map(t -> new BasicUserProfileWithFriends(t.getT1(), t.getT2()));
    }

    @Override
    public Mono<? extends UserProfile> updateProfile(User user) {
        return profileStore.updateUserData(user);
    }

    @Override
    public Mono<? extends UserProfile> findUserById(String id) {
        return profileStore.findProfileById(id);
    }

    @Override
    public Mono<? extends UserProfile> updateRootOrders(String userId, List<String> todoOrder, List<String> groupOrder) {
        return profileStore.updateRootOrder(userId, todoOrder, groupOrder);
    }

    @Override
    public Mono<? extends UserProfile> addCurrentUserPushEndpoint(String endpoint) {
        return profileStore.addPushEndpoint(currentUserProvider.getCurrentUserId(), endpoint);
    }
}
