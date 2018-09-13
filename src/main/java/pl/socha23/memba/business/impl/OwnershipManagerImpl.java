package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.BasicItemInGroup;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.ItemInGroup;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.Set;

@Component
class OwnershipManagerImpl implements OwnershipManager {

    private GroupStore<? extends Group> groupStore;
    private TodoStore<? extends Todo> todoStore;

    public OwnershipManagerImpl(
            GroupStore<? extends Group> groupStore,
            TodoStore<? extends Todo> todoStore
    ) {
        this.groupStore = groupStore;
        this.todoStore = todoStore;
    }

    @Override
    public <T extends BasicItemInGroup> Mono<T> copyParentOwnership(T item) {
        if (ItemInGroup.belongsToRoot(item)) {
            return Mono.just(item);
        } else {
            return copyOwnerFromNonRootParent(item);
        }
    }

    private <T extends BasicItemInGroup> Mono<T> copyOwnerFromNonRootParent(T it) {
        return groupStore
                .findGroupById(it.getGroupId())
                .map(group -> {
                    var ownerIds = group.getOwnerIds();
                    it.setOwnerIds(ownerIds);
                    return it;
                });
    }

    @Override
    public Mono<Void> copyOwnershipToChildren(Mono<? extends Group> group) {
        return group.flatMap(g -> setOwnershipInChildren(g.getOwnerIds(), g));
    }

    @Override
    public Collection<String> getOwnerIds(ItemInGroup item) {
        return item.getOwnerIds();
    }

    private Mono<? extends Void> setOwnershipInChildren(Set<String> ownerIds, Group group) {
        return Mono.when(
                groupStore.setOwnersInDirectGroupMembers(group.getId(), ownerIds),
                todoStore.setOwnersInDirectGroupMembers(group.getId(), ownerIds),
                groupStore
                        .listSubGroups(group.getId())
                        .flatMap(g -> setOwnershipInChildren(ownerIds, g))
        );
    }

}
