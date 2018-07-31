package pl.socha23.memba.web.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.User;
import pl.socha23.memba.web.security.GoogleOAuth2User;

import java.util.Optional;

@Component
public class CurrentUserProvider {

    public User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof OAuth2AuthenticationToken) {
            return new GoogleOAuth2User((OAuth2AuthenticationToken)auth);
        }
        throw new IllegalStateException("No current user!");
    }
}
