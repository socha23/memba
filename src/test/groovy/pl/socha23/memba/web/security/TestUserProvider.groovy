package pl.socha23.memba.web.security

class TestUserProvider implements CurrentUserProvider {

    @Override
    User currentUser() {
        return new User() {

            @Override
            String getId() {
                return "testUserId"
            }

            @Override
            String getFirstName() {
                return "First Name"
            }

            @Override
            String getFullName() {
                return "First Name Lastname"
            }

            @Override
            String getEmail() {
                return "name@domain.com"
            }
        }
    }
}
