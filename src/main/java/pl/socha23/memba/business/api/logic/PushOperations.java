package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.UserProfile;
import reactor.core.publisher.Mono;

public interface PushOperations {
    Mono<Void> pushTo(String userId);
    Mono<? extends UserProfile> addPushEndpoint(String userId, String endpoint);

}
