package pl.socha23.memba.web.security;

import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.logic.ProfileOperations;
import pl.socha23.memba.business.api.model.User;
import pl.socha23.memba.web.security.springsecurity.UserBasedAuthentication;

/**
 *
 */
@Component
public class UserUpdatingAuthorizationListener {

    private ProfileOperations profileOperations;
    
    public UserUpdatingAuthorizationListener(ProfileOperations profileOperations) {
        this.profileOperations = profileOperations;
    }

    @EventListener
    public void onAuth(InteractiveAuthenticationSuccessEvent e) {
        if (e.getAuthentication() instanceof UserBasedAuthentication) {
            updateUserDetails(((UserBasedAuthentication)e.getAuthentication()).getUser());
        }
    }

    private void updateUserDetails(User user) {
        // ugly port between non-reactive and reactive
        profileOperations.updateProfile(user).block();
    }
}
