package pl.socha23.memba.web.todos.controllers;

import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.web.todos.model.CreateUpdateGroupRequest;
import reactor.core.publisher.Mono;

@RestController
public class GroupsController {

    private TodosOperations todosOperations;

    public GroupsController(TodosOperations todosOperations) {
        this.todosOperations = todosOperations;
    }

    @PostMapping("/api/groups")
    public Mono<? extends Group> addGroup(@RequestBody CreateUpdateGroupRequest createGroup) {
        return todosOperations.createGroup(Mono.just(createGroup));
    }

    @PutMapping("/api/groups/{groupId}")
    public Mono<? extends Group> updateGroup(@PathVariable("groupId") String groupId, @RequestBody CreateUpdateGroupRequest updateGroup) {
        return todosOperations.updateGroup(groupId, Mono.just(updateGroup));
    }
}
