package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.model.*;
import reactor.core.publisher.Mono;

@Component
class OwnershipManagerImpl implements OwnershipManager {

    private GroupStore<? extends Group> groupStore;

    public OwnershipManagerImpl(GroupStore<? extends Group> groupStore) {
        this.groupStore = groupStore;
    }

    @Override
    public <T extends BasicItemInGroup> Mono<T> setOwnersToParentGroupOwners(T item) {
        if (ItemInGroup.belongsToRoot(item)) {
            return Mono.just(item);
        } else {
            return setOwnersToNonRootParentGroupOwners(item);
        }
    }

    private <T extends BasicItemInGroup> Mono<T> setOwnersToNonRootParentGroupOwners(T it) {
        return groupStore
                .findGroupById(it.getGroupId())
                .map(group -> {
                    var ownerIds = group.getOwnerIds();
                    it.setOwnerIds(ownerIds);
                    return it;
                });
    }
}
