package pl.socha23.memba.business.api.logic;

import pl.socha23.memba.business.api.model.CreateGroup;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.UpdateGroup;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface GroupsOperations {
    Flux<? extends Group> listCurrentUserGroups();
    Mono<? extends Group> createGroup(Mono<? extends CreateGroup> createGroup);
    Mono<? extends Group> updateGroup(String groupId, Mono<? extends UpdateGroup> updateGroup);
}
