package pl.socha23.memba.web.todos;

import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.model.CreateTodo;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.web.security.CurrentUserProvider;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class TodosController {

    private TodosOperations todosOperations;
    private CurrentUserProvider userProvider;

    @Autowired
    public TodosController(TodosOperations todosOperations, CurrentUserProvider userProvider) {
        this.todosOperations = todosOperations;
        this.userProvider = userProvider;
    }

    @GetMapping("/api/todos")
    public Flux<Todo> currentUserTodos() {
        return todosOperations.listTodosByUserId(getCurrentUserId());
    }

    /*
     * problem: to move entirely to webflux we would have to disable webmvc, and that breaks the web login,
     * so better let's not
     */

    @PostMapping("/api/todos")
    public Mono<Todo> addTodo(@RequestBody CreateTodoRequestPayload createTodo) {
        return todosOperations.createTodo(getCurrentUserId(), Mono.just(createTodo));
    }

    @PutMapping("/api/todos/{todoId}/completed")
    public Mono<Boolean> setCompleted(@PathVariable("todoId") String todoId, @RequestBody boolean completed) {
        return todosOperations.setCompleted(getCurrentUserId(), todoId, completed);
    };





    private String getCurrentUserId() {
        return userProvider.currentUser().getId();
    }
}
