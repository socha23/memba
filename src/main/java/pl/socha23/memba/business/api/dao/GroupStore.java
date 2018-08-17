package pl.socha23.memba.business.api.dao;

import pl.socha23.memba.business.api.model.Group;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Set;

public interface GroupStore<T extends Group> {

    Mono<T> findGroupById(String id);

    Flux<T> listGroupsByOwnerId(String userId);

    Flux<T> listSubGroups(String groupId);

    Mono<T> createGroup(Mono<? extends Group> group);

    Mono<T> updateGroup(Mono<? extends Group> group);

    Mono<Void> deleteGroup(String groupId);

    /**
     * Update all the groups belonging to a given group and makes them parts of another one
     */
    Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId);

    Mono<Void> setOwnersInDirectGroupMembers(String groupId, Set<String> ownerIds);
}
