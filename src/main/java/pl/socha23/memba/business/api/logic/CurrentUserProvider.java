package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.UserData;

public interface CurrentUserProvider {
    UserData currentUser();

    default String getCurrentUserId() {
        return currentUser().getId();
    }
}
