package pl.socha23.memba.web.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.model.User;

@RestController
public class CurrentUserController {

    private CurrentUserProvider currentUserProvider;

    public CurrentUserController(CurrentUserProvider currentUserProvider) {
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping("/api/currentUser")
    public User currentUser() {
        return currentUserProvider.currentUser();
    }

}
