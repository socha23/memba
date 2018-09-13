package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.PushSubscription;

import java.util.HashSet;
import java.util.Set;

import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED;
import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.SUCCESS;

public class TestPushSender implements PushNotificationSender {

    private Set<String> validEndpoints = new HashSet<>();
    private Set<String> pushSuccesses = new HashSet<>();
    private Set<String> pushFailures = new HashSet<>();

    @Override
    public PushResult sendPushNotification(PushSubscription subscription, Object payload) {
        if (validEndpoints.contains(subscription.getEndpoint())) {
            pushSuccesses.add(subscription.getEndpoint());
            return new PushResult(subscription, SUCCESS);
        } else {
            pushFailures.add(subscription.getEndpoint());
            return new PushResult(subscription, ENDPOINT_NOT_REGISTRED);
        }
    }

    public TestPushSender addValidEndpoint(String endpoint) {
        validEndpoints.add(endpoint);
        return this;
    }

    public Set<String> getPushSuccesses() {
        return pushSuccesses;
    }

    public Set<String> getPushFailures() {
        return pushFailures;
    }
}
