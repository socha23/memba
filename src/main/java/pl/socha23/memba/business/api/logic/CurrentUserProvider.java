package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.User;

public interface CurrentUserProvider {
    User currentUser();

    default String getCurrentUserId() {
        return currentUser().getId();
    }
}
