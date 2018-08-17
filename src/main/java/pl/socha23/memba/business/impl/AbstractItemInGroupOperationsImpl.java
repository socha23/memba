package pl.socha23.memba.business.impl;

import pl.socha23.memba.business.api.model.BasicItemInGroup;
import pl.socha23.memba.business.api.model.CreateOrUpdateItemInGroup;
import pl.socha23.memba.business.api.model.ItemInGroup;
import reactor.core.publisher.Mono;

class AbstractItemInGroupOperationsImpl<T extends BasicItemInGroup>  {

    private OwnershipManager ownershipManager;

    protected AbstractItemInGroupOperationsImpl(OwnershipManager ownershipManager) {
        this.ownershipManager = ownershipManager;
    }

    Mono<T> setOwnershipIfNeeded(T item, ItemInGroup originalItem, CreateOrUpdateItemInGroup command) {
        if (command.changesParentGroup(originalItem)) {
            return ownershipManager.copyParentOwnership(item);
        } else {
            return Mono.just(item);
        }

    }


}
