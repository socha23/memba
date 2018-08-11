package pl.socha23.memba.web.todos.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Item;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.web.todos.model.GroupWithType;
import pl.socha23.memba.web.todos.model.ItemWithType;
import pl.socha23.memba.web.todos.model.TodoWithType;
import reactor.core.publisher.Flux;

@RestController
public class ItemsController {

    private TodosOperations todosOperations;

    public ItemsController(TodosOperations todosOperations) {
        this.todosOperations = todosOperations;
    }

    @GetMapping("/api/items")
    public Flux<ItemWithType> currentUserItems() {
        return todosOperations
                .listCurrentUserItems()
                .map(this::toItemWithType);
    }

    /*
     * problem: to move entirely to webflux we would have to disable webmvc, and that breaks the web login,
     * so better let's not
     */

    private ItemWithType toItemWithType(Item item) {
        if (item instanceof Todo) {
            return TodoWithType.of((Todo) item);
        } else if (item instanceof Group) {
            return GroupWithType.of((Group) item);
        } else {
            throw new IllegalArgumentException();
        }
    }
}
