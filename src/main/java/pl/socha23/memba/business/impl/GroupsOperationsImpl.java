package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.GroupsOperations;
import pl.socha23.memba.business.api.model.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.time.Instant;
import java.util.Collections;

@Component
public class GroupsOperationsImpl extends AbstractItemInGroupOperationsImpl<BasicGroup> implements GroupsOperations {

    private TodoStore<? extends Todo> todoStore;
    private GroupStore<? extends Group> groupStore;
    private CurrentUserProvider currentUserProvider;
    private OwnershipManager ownershipManager;

    public GroupsOperationsImpl(
            TodoStore<? extends Todo> todoStore,
            GroupStore<? extends Group> groupStore,
            CurrentUserProvider currentUserProvider,
            OwnershipManager ownershipManager) {
        super(ownershipManager);
        this.todoStore = todoStore;
        this.groupStore = groupStore;
        this.currentUserProvider = currentUserProvider;
        this.ownershipManager = ownershipManager;
    }

    @Override
    public Flux<? extends Group> listCurrentUserGroups() {
        return groupStore.listGroupsByOwnerId(currentUserProvider.getCurrentUserId());
    }

    @Override
    public Mono<? extends Group> createGroup(Mono<? extends CreateOrUpdateGroup> command) {
        return command
                .map(this::createGroupObject)
                .flatMap(ownershipManager::copyParentOwnership)
                .transform(groupStore::createGroup);
    }

    private BasicGroup createGroupObject(CreateOrUpdateGroup create) {
        var group = new BasicGroup();
        group.setOwnerIds(create.getOwnerIds() != null ? create.getOwnerIds() : Collections.singleton(currentUserProvider.getCurrentUserId()));
        group.setGroupId(create.getGroupId());
        group.setText(create.getText());
        group.setColor(create.getColor());
        group.setCreatedOn(Instant.now());
        return group;
    }

    @Override
    public Mono<? extends Group> updateGroup(String groupId, Mono<? extends CreateOrUpdateGroup> command) {
        return groupStore
                .findGroupById(groupId)
                .zipWith(command)
                .flatMap(t -> {
                    var result = updateFields(t.getT1(), t.getT2());
                    return setOwnershipIfNeeded(result, t.getT1(), t.getT2());
                })
                .transform(g -> groupStore.updateGroup(g))
                .transform(g -> ownershipManager.copyOwnershipToChildren(g).then(g));
    }

    private BasicGroup updateFields(Group group, CreateOrUpdateGroup updateGroup) {
        var newGroup = BasicGroup.copy(group);

        if (updateGroup.getGroupId() != null) {
            newGroup.setGroupId(updateGroup.getGroupId());
        }

        if (updateGroup.getText() != null) {
            newGroup.setText(updateGroup.getText());
        }

        if (updateGroup.getColor() != null) {
            newGroup.setColor(updateGroup.getColor());
        }

        if (updateGroup.getOwnerIds() != null) {
            newGroup.setOwnerIds(updateGroup.getOwnerIds());
        }

        return newGroup;
    }

    @Override
    public Mono<Void> deleteGroup(String groupId) {
        return groupStore
                .findGroupById(groupId)
                .flatMap(g -> Mono.when(
                        groupStore.deleteGroup(g.getId()),
                        groupStore.changeEveryGroupId(groupId, g.getGroupId()),
                        todoStore.changeEveryGroupId(groupId, g.getGroupId())
                        )
                );
    }
}
