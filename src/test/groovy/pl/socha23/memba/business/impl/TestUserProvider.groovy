package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.logic.CurrentUserProvider
import pl.socha23.memba.business.api.model.User

class TestUserProvider implements CurrentUserProvider {

    public final static USER_ID = "testUserId";

    @Override
    User currentUser() {
        return new User() {

            @Override
            String getId() {
                return USER_ID
            }

            @Override
            String getFirstName() {
                return "first name"
            }

            @Override
            String getFullName() {
                return "full name"
            }

            @Override
            String getPictureUrl() {
                return "picture url"
            }
        }
    }
}
