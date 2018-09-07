package pl.socha23.memba.web.todos.controllers;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/api/profile/pushEndpoints")
    public Mono<PushEndpointResult> postPushEndpoint(@RequestBody PushEndpointRequest request) {
        System.out.println("Got push endpoint: " + request.getEndpoint());
        return Mono.just(PushEndpointResult.success());
    }

    static class PushEndpointRequest {
        private String endpoint;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }
    }

    static class PushEndpointResult {
        private boolean success;

        private PushEndpointResult(boolean success) {
            this.success = success;
        }

        public boolean isSuccess() {
            return success;
        }

        static PushEndpointResult success() {
            return new PushEndpointResult(true);
        }
    }

}
