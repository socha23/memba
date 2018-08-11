package pl.socha23.memba.web.todos;

import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.Group;
import pl.socha23.memba.business.api.model.Item;
import pl.socha23.memba.business.api.model.Todo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class TodosController {

    private TodosOperations todosOperations;

    public TodosController(TodosOperations todosOperations) {
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

    @PostMapping("/api/todos")
    public Mono<? extends Todo> addTodo(@RequestBody CreateTodoRequest createTodo) {
        return todosOperations.createTodo(Mono.just(createTodo));
    }

    @PutMapping("/api/todos/{todoId}")
    public Mono<? extends Todo> update(@PathVariable("todoId") String todoId, @RequestBody UpdateTodoRequest updateTodo) {
        return todosOperations.updateTodo(todoId, Mono.just(updateTodo));
    }

    @PutMapping("/api/todos/{todoId}/completed")
    public Mono<? extends Todo> setCompleted(@PathVariable("todoId") String todoId, @RequestBody boolean completed) {
        return todosOperations.updateTodo(todoId, Mono.just(UpdateTodoRequest.withCompleted(completed)));
    }


    @PostMapping("/api/groups")
    public Mono<? extends Group> addGroup(@RequestBody CreateUpdateGroupRequest createGroup) {
        return todosOperations.createGroup(Mono.just(createGroup));
    }


    private ItemWithType toItemWithType(Item item) {
        if (item instanceof Todo) {
            return TodoWithType.of((Todo) item);
        } else if (item instanceof Group) {
            return GroupWithType.of((Group) item);
        } else {
            throw new IllegalArgumentException();
        }
    }

    @PutMapping("/api/groups/{groupId}")
    public Mono<? extends Group> updateGroup(@PathVariable("groupId") String groupId, @RequestBody CreateUpdateGroupRequest updateGroup) {
        return todosOperations.updateGroup(groupId, Mono.just(updateGroup));
    }
}
