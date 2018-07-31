package pl.socha23.memba.web.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class SpringSecurityCurrentUserProvider implements CurrentUserProvider {

    @Override
    public User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof OAuth2AuthenticationToken) {
            return new GoogleOAuth2User((OAuth2AuthenticationToken)auth);
        }
        throw new IllegalStateException("No current user!");
    }
}
