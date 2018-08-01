package pl.socha23.memba.web.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SpringSecurityCurrentUserProvider implements CurrentUserProvider {

    @Override
    public User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof UserBasedAuthentication) {
            return ((UserBasedAuthentication)auth).getUser();
        }
        throw new IllegalStateException("No current user!");
    }
}
