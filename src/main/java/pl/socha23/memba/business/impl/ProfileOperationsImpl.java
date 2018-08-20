package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.ProfileOperations;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.business.api.model.UserData;
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
    public Mono<? extends User> getCurrentUser() {
        String id = currentUserProvider.currentUser().getId();
        return profileStore.findProfileById(id);
    }

    @Override
    public Mono<? extends User> updateProfile(UserData user) {
        return profileStore.updateUserData(user);
    }

    @Override
    public Mono<? extends User> findUserById(String id) {
        return profileStore.findProfileById(id);
    }

    @Override
    public Mono<? extends User> updateRootOrders(String userId, List<String> todoOrder, List<String> groupOrder) {
        return profileStore.updateRootOrder(userId, todoOrder, groupOrder);
    }
}
