package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.PushSubscriptionStore;
import pl.socha23.memba.business.api.logic.PushOperations;
import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PushOperationsImpl implements PushOperations {

    private PushSubscriptionStore pushSubscriptionsStore;
    private PushNotificationSender pushNotificationSender;

    public PushOperationsImpl(PushSubscriptionStore pushSubscriptionsStore, PushNotificationSender pushNotificationSender) {
        this.pushSubscriptionsStore = pushSubscriptionsStore;
        this.pushNotificationSender = pushNotificationSender;
    }

    @Override
    public Mono<Void> pushTo(String userId) {
         var subscriptions = pushSubscriptionsStore.listPushSubscriptions(userId);
         if (subscriptions != null) {
             return pushToEndpoints(subscriptions)
                     .flatMap(results -> this.removeUnregisteredEndpoints(userId, results))
                     .then();
         } else {
             return Mono.empty();
         }
    }

    @Override
    public void addPushEndpoint(String userId, String endpoint) {
        pushSubscriptionsStore.addPushEndpoint(userId, endpoint);
    }

    private <R> Mono<? extends UserProfile> removeUnregisteredEndpoints(String userId, List<PushNotificationSender.PushResult> pushResults) {
        Set<String> endpointsToRemove = pushResults.stream()
                .filter(p -> p.getStatus() == PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED)
                .map(PushNotificationSender.PushResult::getEndpoint)
                .collect(Collectors.toSet());
        return pushSubscriptionsStore.removePushEndpoints(userId, endpointsToRemove);
    }

    private Mono<List<PushNotificationSender.PushResult>> pushToEndpoints(Collection<String> subscriptions) {
        return Flux.fromIterable(subscriptions)
                .flatMap(this::pushToEndpoint)
                .collectList();
    }

    private Mono<PushNotificationSender.PushResult> pushToEndpoint(String endpoint) {
        return pushNotificationSender.sendPushNotification(endpoint);
    }

}
