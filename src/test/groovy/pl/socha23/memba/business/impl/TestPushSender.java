package pl.socha23.memba.business.impl;

import reactor.core.publisher.Mono;

import java.util.HashSet;
import java.util.Set;

import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED;
import static pl.socha23.memba.business.impl.PushNotificationSender.PushResult.Status.SUCCESS;

public class TestPushSender implements PushNotificationSender {

    private Set<String> validEndpoints = new HashSet<>();
    private Set<String> pushSuccesses = new HashSet<>();
    private Set<String> pushFailures = new HashSet<>();

    @Override
    public Mono<PushResult> sendPushNotification(String endpoint) {
        if (validEndpoints.contains(endpoint)) {
            pushSuccesses.add(endpoint);
            return Mono.just(new PushResult(endpoint, SUCCESS));
        } else {
            pushFailures.add(endpoint);
            return Mono.just(new PushResult(endpoint, ENDPOINT_NOT_REGISTRED));
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
