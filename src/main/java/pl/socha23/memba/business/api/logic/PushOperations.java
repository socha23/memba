package pl.socha23.memba.business.api.logic;

import reactor.core.publisher.Mono;

public interface PushOperations {
    Mono<Void> pushTo(String userId);
}
