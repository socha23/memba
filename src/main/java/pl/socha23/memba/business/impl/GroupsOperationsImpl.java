package pl.socha23.memba.business.impl;

import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.logic.CurrentUserProvider;
import pl.socha23.memba.business.api.logic.GroupsOperations;
import pl.socha23.memba.business.api.model.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Component
public class GroupsOperationsImpl implements GroupsOperations {

    private TodoStore<? extends Todo> todoStore;
    private GroupStore<? extends Group> groupStore;
    private CurrentUserProvider currentUserProvider;

    public GroupsOperationsImpl(TodoStore<? extends Todo> todoStore, GroupStore<? extends Group> groupStore, CurrentUserProvider currentUserProvider) {
        this.todoStore = todoStore;
        this.groupStore = groupStore;
        this.currentUserProvider = currentUserProvider;
    }

    @Override
    public Flux<? extends Group> listCurrentUserGroups() {
        return groupStore.listGroupsByOwnerId(currentUserProvider.getCurrentUserId());
    }

    @Override
    public Mono<? extends Group> createGroup(Mono<? extends CreateGroup> createGroup) {
        return createGroup
                .map(this::doCreateGroup)
                .compose(groupStore::createGroup);
    }

    private Group doCreateGroup(CreateGroup create) {
        var group = new BasicGroup();
        group.setOwnerId(currentUserProvider.getCurrentUserId());
        group.setGroupId(create.getGroupId());
        group.setText(create.getText());
        group.setColor(create.getColor());
        group.setCreatedOn(Instant.now());

        return group;
    }

    @Override
    public Mono<? extends Group> updateGroup(String groupId, Mono<? extends UpdateGroup> updateGroup) {
        return groupStore
                .findGroupById(groupId)
                .zipWith(updateGroup, this::doUpdateGroup)
                .compose(groupStore::updateGroup);
    }

    private BasicGroup doUpdateGroup(Group group, UpdateGroup updateGroup) {
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

        return newGroup;
    }
}
