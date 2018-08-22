package pl.socha23.memba.web.todos.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.GroupsOperations;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.web.todos.model.ItemsRequestResult;
import reactor.core.publisher.Mono;

@RestController
public class ItemsController {

    private TodosOperations todosOperations;
    private GroupsOperations groupsOperations;

    public ItemsController(TodosOperations todosOperations, GroupsOperations groupsOperations) {
        this.todosOperations = todosOperations;
        this.groupsOperations = groupsOperations;
    }

    public Mono<ItemsRequestResult> currentUserItems() {
        return currentUserItems(true);
    }

    @GetMapping("/api/items")
    public Mono<ItemsRequestResult> currentUserItems(@RequestParam(name = "completed", defaultValue = "false") boolean returnCompleted) {
        var groups = groupsOperations.listCurrentUserGroups();
        var todos = todosOperations.listCurrentUserTodos();

        var notCompletedTodos = todos.filter(t -> !t.isCompleted());
        var completedTodos = todos.filter(Todo::isCompleted);

        return Mono
                .zip(groups.collectList(), notCompletedTodos.collectList(), completedTodos.collectList())
                .map(t -> ItemsRequestResult.of(t.getT1(), t.getT2(), returnCompleted ? t.getT3() : null));
    }
}

