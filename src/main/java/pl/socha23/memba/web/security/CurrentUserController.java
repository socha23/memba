package pl.socha23.memba.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.web.security.User;
import pl.socha23.memba.web.security.CurrentUserProvider;

@RestController
public class CurrentUserController {

    private CurrentUserProvider currentUserProvider;

    @Autowired
    public CurrentUserController(CurrentUserProvider currentUserProvider) {
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping("/currentUser")
    public User currentUser() {
        return currentUserProvider.currentUser();
    }

}
