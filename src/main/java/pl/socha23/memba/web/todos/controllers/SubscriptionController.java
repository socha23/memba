package pl.socha23.memba.web.todos.controllers;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.PushOperations;
import reactor.core.publisher.Mono;

@Component
@RestController
public class SubscriptionController {

    private PushOperations pushOperations;
    private CurrentUserProvider currentUserProvider;

    public SubscriptionController(PushOperations pushOperations, CurrentUserProvider currentUserProvider) {
        this.pushOperations = pushOperations;
        this.currentUserProvider = currentUserProvider;
    }

    @PostMapping("/api/pushSubscriptions")
    public Mono<SubsciptionResult> postSubscription(@RequestBody SubscriptionRequest request) {
        return pushOperations
                .addPushEndpoint(currentUserProvider.getCurrentUserId(), request.getEndpoint())
                .map(t -> SubsciptionResult.success());
    }

    static class SubscriptionRequest {
        private String endpoint;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }
    }

    static class SubsciptionResult {
        private boolean success;

        private SubsciptionResult(boolean success) {
            this.success = success;
        }

        public boolean isSuccess() {
            return success;
        }

        static SubsciptionResult success() {
            return new SubsciptionResult(true);
        }
    }

}
