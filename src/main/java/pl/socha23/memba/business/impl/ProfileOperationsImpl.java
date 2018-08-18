package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.ProfileOperations;
import pl.socha23.memba.business.api.model.BasicProfile;
import pl.socha23.memba.business.api.model.Profile;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class ProfileOperationsImpl implements ProfileOperations {

    private ProfileStore profileStore;
    private CurrentUserProvider currentUserProvider;

    public ProfileOperationsImpl(ProfileStore profileStore, CurrentUserProvider currentUserProvider) {

        this.profileStore = profileStore;
        this.currentUserProvider = currentUserProvider;
    }

    @Override
    public Mono<Profile> getCurrentUserProfile() {
        BasicProfile p = BasicProfile.from(currentUserProvider.currentUser());
        return getFriends(p.getId())
                .collectList()
                .map(f -> {
                    p.setFriends(f);
                    return p;
                });
    }

    @Override
    public Mono<User> updateProfile(User user) {
        return profileStore.updateProfile(user);
    }

    @Override
    public Mono<? extends User> findUserById(String id) {
        return profileStore.findProfileById(id);
    }

    private Flux<? extends User> getFriends(String userId) {
        return profileStore.listAllUsers()
                .filter(t -> !userId.equals(t.getId()));
    }
}
