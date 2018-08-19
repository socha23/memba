package pl.socha23.memba.dao.mem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.model.BasicGroup;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Item;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.stream.Collectors;

@Component
@Profile("mem")
public class MemGroupStore implements GroupStore<BasicGroup> {

    private int autoInc = 0;
    private Map<String, BasicGroup> groupsById = new HashMap<>();

    @Override
    public Mono<BasicGroup> findGroupById(String id) {
        return Mono.justOrEmpty(groupsById.get(id));
    }

    @Override
    public Flux<BasicGroup> listGroupsByOwnerId(String userId) {
        return Flux.fromIterable(getUserGroups(userId));
    }

    @Override
    public Flux<BasicGroup> listSubGroups(String groupId) {
        return Flux.fromStream(
                groupsById.values().stream()
                        .filter(g -> groupId.equals(g.getGroupId()))
        );
    }

    @Override
    public Mono<BasicGroup> createGroup(Mono<? extends Group> group) {
        return group
                .map(this::addGroup);
    }

    private BasicGroup addGroup(Group group) {
        var newGroup = BasicGroup.copy(group);

        if (newGroup.getId() == null) {
            newGroup.setId(autoinc());
        }

        groupsById.put(newGroup.getId(), newGroup);
        return newGroup;
    }

    private String autoinc() {
        return "_autoincGroup" + autoInc++;
    }

    @Override
    public Mono<BasicGroup> updateGroup(Mono<? extends Group> group) {
        return group.map(this::doUpdateGroup);
    }

    private BasicGroup doUpdateGroup(Group group) {
        var result = BasicGroup.copy(group);
        groupsById.put(group.getId(), result);
        return result;
    }

    private List<BasicGroup> getUserGroups(String userId) {
        return groupsById.values().stream()
                .filter(t -> t.getOwnerIds().contains(userId))
                .sorted(Comparator.comparing(Item::getId).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public Mono<Void> deleteGroup(String groupId) {
        groupsById.remove(groupId);
        return Mono.empty();
    }

    @Override
    public Mono<Void> changeEveryGroupId(String fromGroupId, String toGroupId) {
        groupsById.values().stream()
                .filter(g -> fromGroupId.equals(g.getGroupId()))
                .forEach(g -> g.setGroupId(toGroupId));
        return Mono.empty();
    }

    @Override
    public Mono<Void> setOwnersInDirectGroupMembers(String groupId, Set<String> ownerIds) {
        groupsById.values().stream()
                .filter(t -> groupId.equals(t.getGroupId()))
                .forEach(t -> t.setOwnerIds(ownerIds));
        return Mono.empty();
    }
}
