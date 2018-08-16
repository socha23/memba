package pl.socha23.memba.web.todos.controllers;

import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.web.todos.model.CreateOrUpdateTodoRequest;
import reactor.core.publisher.Mono;

@RestController
public class TodosController {

    private TodosOperations todosOperations;

    public TodosController(TodosOperations todosOperations) {
        this.todosOperations = todosOperations;
    }

    @PostMapping("/api/todos")
    public Mono<? extends Todo> addTodo(@RequestBody CreateOrUpdateTodoRequest createTodo) {
        return todosOperations.createTodo(Mono.just(createTodo));
    }

    @PutMapping("/api/todos/{todoId}")
    public Mono<? extends Todo> updateTodo(@PathVariable("todoId") String todoId, @RequestBody CreateOrUpdateTodoRequest updateTodo) {
        return todosOperations.updateTodo(todoId, Mono.just(updateTodo));
    }

    @PutMapping("/api/todos/{todoId}/completed")
    public Mono<? extends Todo> setCompleted(@PathVariable("todoId") String todoId, @RequestBody boolean completed) {
        return todosOperations.updateTodo(todoId, Mono.just(CreateOrUpdateTodoRequest.withCompleted(completed)));
    }

    @DeleteMapping("/api/todos/{todoId}")
    public Mono<Void> deleteTodo(@PathVariable("todoId") String todoId) {
        return todosOperations.deleteTodo(todoId);
    }
}
