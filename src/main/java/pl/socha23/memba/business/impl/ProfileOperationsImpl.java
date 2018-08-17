package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.ProfileOperations;
import pl.socha23.memba.business.api.model.User;
import reactor.core.publisher.Mono;

@Component
public class ProfileOperationsImpl implements ProfileOperations {

    private ProfileStore profileStore;

    public ProfileOperationsImpl(ProfileStore profileStore) {
        this.profileStore = profileStore;
    }

    @Override
    public Mono<User> updateProfile(User user) {
        return profileStore.updateProfile(user);
    }

    @Override
    public Mono<? extends User> findProfileById(String id) {
        return profileStore.findProfileById(id);
    }
}
