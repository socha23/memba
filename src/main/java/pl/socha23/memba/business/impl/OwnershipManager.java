package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.BasicItemInGroup;
import reactor.core.publisher.Mono;

interface OwnershipManager {

    <T extends BasicItemInGroup> Mono<T> setOwnersToParentGroupOwners(T item);
}
