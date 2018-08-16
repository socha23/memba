package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.CreateOrUpdateGroup;
import pl.socha23.memba.business.api.model.Group;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupsOperations {
    Flux<? extends Group> listCurrentUserGroups();
    Mono<? extends Group> createGroup(Mono<? extends CreateOrUpdateGroup> createGroup);
    Mono<? extends Group> updateGroup(String groupId, Mono<? extends CreateOrUpdateGroup> updateGroup);
    Mono<Void> deleteGroup(String groupId);
}
