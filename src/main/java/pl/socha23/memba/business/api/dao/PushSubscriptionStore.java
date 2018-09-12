package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Mono;

import java.util.Collection;

public interface PushSubscriptionStore {
    Collection<String> listPushSubscriptions(String userId);
    void addPushEndpoint(String id, String endpoint);
    Mono<? extends UserProfile> removePushEndpoints(String id, Collection<String> endpointsToRemove);
}
