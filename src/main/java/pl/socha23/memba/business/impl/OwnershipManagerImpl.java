package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.model.BasicTodo;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.ItemInGroup;
import reactor.core.publisher.Mono;

@Component
class OwnershipManagerImpl implements OwnershipManager {

    private GroupStore<? extends Group> groupStore;

    public OwnershipManagerImpl(GroupStore<? extends Group> groupStore) {
        this.groupStore = groupStore;
    }

    @Override
    public Mono<BasicTodo> setOwnersToParentGroupOwners(BasicTodo item) {
        if (ItemInGroup.belongsToRoot(item)) {
            return Mono.just(item);
        } else {
            return setOwnersToNonRootParentGroupOwners(item);
        }
    }

    private Mono<BasicTodo> setOwnersToNonRootParentGroupOwners(BasicTodo it) {
        return groupStore
                .findGroupById(it.getGroupId())
                .map(group -> {
                    var ownerIds = group.getOwnerIds();
                    it.setOwnerIds(ownerIds);
                    return it;
                });
    }
}
