package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.BasicTodo;
import reactor.core.publisher.Mono;

interface OwnershipManager {

    Mono<BasicTodo> setOwnersToParentGroupOwners(BasicTodo item);
}
