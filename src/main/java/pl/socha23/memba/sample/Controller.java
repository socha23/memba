package pl.socha23.memba.sample;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

/**
 *
 */
@RestController
public class Controller {

    private CurrentUserProvider currentUserProvider;

    @Autowired
    public Controller(CurrentUserProvider currentUserProvider) {
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping("/currentUser")
    public User currentUser() {
        return currentUserProvider.currentUser().orElse(null);
    }

}
