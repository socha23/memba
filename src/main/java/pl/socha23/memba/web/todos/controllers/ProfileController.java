package pl.socha23.memba.web.todos.controllers;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.ProfileOperations;
import pl.socha23.memba.business.api.model.UserProfileWithFriends;
import reactor.core.publisher.Mono;

@Component
@RestController
public class ProfileController {

    private ProfileOperations profileOperations;

    public ProfileController(ProfileOperations profileOperations) {
        this.profileOperations = profileOperations;
    }

    @GetMapping("/api/profile")
    public Mono<? extends UserProfileWithFriends> getProfile() {
        return profileOperations.getCurrentUserProfile();
    }


}
