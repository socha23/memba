package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.PushOperations;
import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class PushOperationsImpl implements PushOperations {

    private ProfileStore profileStore;
    private PushNotificationSender pushNotificationSender;

    public PushOperationsImpl(ProfileStore profileStore, PushNotificationSender pushNotificationSender) {
        this.profileStore = profileStore;
        this.pushNotificationSender = pushNotificationSender;
    }

    @Override
    public Mono<Void> pushTo(String userId) {
        return profileStore
                .findProfileById(userId)
                .flatMap(this::pushToEndpoints)
                .flatMap(results -> this.removeUnregisteredEndpoints(userId, results))
                .then();
    }

    private <R> Mono<? extends UserProfile> removeUnregisteredEndpoints(String userId, List<PushNotificationSender.PushResult> pushResults) {
        Set<String> endpointsToRemove = pushResults.stream()
                .filter(p -> p.getStatus() == PushNotificationSender.PushResult.Status.ENDPOINT_NOT_REGISTRED)
                .map(PushNotificationSender.PushResult::getEndpoint)
                .collect(Collectors.toSet());
        return profileStore.removePushEndpoints(userId, endpointsToRemove);
    }

    private Mono<List<PushNotificationSender.PushResult>> pushToEndpoints(UserProfile p) {
        return Flux.fromIterable(p.getPushEndpoints())
                .flatMap(this::pushToEndpoint)
                .collectList();
    }

    private Mono<PushNotificationSender.PushResult> pushToEndpoint(String endpoint) {
        return pushNotificationSender.sendPushNotification(endpoint);
    }

}
