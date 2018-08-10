package pl.socha23.memba.web.todos;

import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.logic.TodosOperations;
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
    public Flux<? extends Item> currentUserItems() {
        return todosOperations.listCurrentUserItems();
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
}
