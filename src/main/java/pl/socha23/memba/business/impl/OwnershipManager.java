package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.BasicItemInGroup;
import pl.socha23.memba.business.api.model.Group;
import reactor.core.publisher.Mono;

interface OwnershipManager {

    <T extends BasicItemInGroup> Mono<T> copyParentOwnership(T item);

    Mono<Void> copyOwnershipToChildren(Mono<? extends Group> group);

}
