package pl.socha23.memba.web.todos.controllers;

import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.logic.GroupsOperations;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.web.todos.model.CreateUpdateGroupRequest;
import reactor.core.publisher.Mono;

@RestController
public class GroupsController {

    private GroupsOperations groupsOperations;

    public GroupsController(GroupsOperations groupsOperations) {
        this.groupsOperations = groupsOperations;
    }

    /*
     * problem: to move entirely to webflux we would have to disable webmvc, and that breaks the web login,
     * so better let's not
     */

    @PostMapping("/api/groups")
    public Mono<? extends Group> addGroup(@RequestBody CreateUpdateGroupRequest createGroup) {
        return groupsOperations.createGroup(Mono.just(createGroup));
    }

    @PutMapping("/api/groups/{groupId}")
    public Mono<? extends Group> updateGroup(@PathVariable("groupId") String groupId, @RequestBody CreateUpdateGroupRequest updateGroup) {
        return groupsOperations.updateGroup(groupId, Mono.just(updateGroup));
    }
}
