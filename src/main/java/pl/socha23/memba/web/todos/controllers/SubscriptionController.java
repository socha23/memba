package pl.socha23.memba.web.todos.controllers;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.PushOperations;
import pl.socha23.memba.business.api.model.BasicPushSubscription;

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
    public SubsciptionResult postSubscription(@RequestBody SubscriptionRequest request) {
        pushOperations.addPushSubscription(currentUserProvider.getCurrentUserId(), request);
        return SubsciptionResult.success();

    }

    private static class SubscriptionRequest extends BasicPushSubscription {
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
