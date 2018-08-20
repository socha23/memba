package pl.socha23.memba.web.security.springsecurity;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.model.UserData;

@Component
public class SpringSecurityCurrentUserProvider implements CurrentUserProvider {

    @Override
    public UserData currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof UserBasedAuthentication) {
            return ((UserBasedAuthentication)auth).getUser();
        }
        throw new IllegalStateException("No current user!");
    }
}
