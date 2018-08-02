package pl.socha23.memba.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrentUserController {

    private CurrentUserProvider currentUserProvider;

    @Autowired
    public CurrentUserController(CurrentUserProvider currentUserProvider) {
        this.currentUserProvider = currentUserProvider;
    }

    @GetMapping("/api/currentUser")
    public User currentUser() {
        return currentUserProvider.currentUser();
    }

}
