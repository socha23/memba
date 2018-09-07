package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.ProfileStore;
import pl.socha23.memba.business.api.logic.PushOperations;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
                .flatMap(p ->
                    Flux
                            .fromIterable(p.getPushEndpoints())
                            .flatMap(this::pushToEndpoint)
                            .then()
                );
    }

    private Mono<Void> pushToEndpoint(String endpoint) {
        return pushNotificationSender.sendPushNotification(endpoint);
    }
}
