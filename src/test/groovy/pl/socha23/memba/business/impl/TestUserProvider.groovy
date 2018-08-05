package pl.socha23.memba.business.impl

import pl.socha23.memba.business.api.logic.CurrentUserProvider
import pl.socha23.memba.business.api.model.User

class TestUserProvider implements CurrentUserProvider {

    @Override
    User currentUser() {
        return new User() {

            @Override
            String getId() {
                return "testUserId"
            }

            String getFirstName() {
                return "First Name"
            }

            String getFullName() {
                return "First Name Lastname"
            }

            String getEmail() {
                return "name@domain.com"
            }
        }
    }
}
