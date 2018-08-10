package pl.socha23.memba.dao.mem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import pl.socha23.memba.business.api.dao.GroupStore;
import pl.socha23.memba.business.api.dao.TodoStore;
import pl.socha23.memba.business.api.model.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    public Mono<BasicGroup> createGroup(Mono<? extends Group> group) {
        return group
                .map(this::addGroup);
    }

    private BasicGroup doUpdateGroup(Group group) {
        return groupsById.put(group.getId(), BasicGroup.copy(group));
    }

    private List<BasicGroup> getUserGroups(String userId) {
        return groupsById.values().stream()
                .filter(t -> t.getOwnerId().equals(userId))
                .sorted(Comparator.comparing(Item::getId).reversed())
                .collect(Collectors.toList());
    }

    public BasicGroup addGroup(Group group) {
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
}
