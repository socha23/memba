package pl.socha23.memba.web.todos;

import org.springframework.web.bind.annotation.*;
import pl.socha23.memba.business.api.logic.TodosOperations;
import pl.socha23.memba.business.api.model.Todo;
import pl.socha23.memba.business.api.model.UpdateTodo;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class TodosController {

    private TodosOperations todosOperations;

    public TodosController(TodosOperations todosOperations) {
        this.todosOperations = todosOperations;
    }

    @GetMapping("/api/todos")
    public Flux<Todo> currentUserTodos() {
        return todosOperations.listCurrentUserTodos();
    }

    /*
     * problem: to move entirely to webflux we would have to disable webmvc, and that breaks the web login,
     * so better let's not
     */

    @PostMapping("/api/todos")
    public Mono<Todo> addTodo(@RequestBody CreateTodoRequest createTodo) {
        return todosOperations.createTodo(Mono.just(createTodo));
    }

    @PutMapping("/api/todos/{todoId}")
    public Mono<Todo> update(@PathVariable("todoId") String todoId, @RequestBody UpdateTodoRequest updateTodo) {
        return todosOperations.updateTodo(todoId, Mono.just(updateTodo));
    };

    @PutMapping("/api/todos/{todoId}/completed")
    public Mono<Todo> setCompleted(@PathVariable("todoId") String todoId, @RequestBody boolean completed) {
        return todosOperations.updateTodo(todoId, Mono.just(UpdateTodoRequest.withCompleted(completed)));
    };

    private static class UpdateTodoRequest implements UpdateTodo {
        private String text;
        private Boolean completed;

        @Override
        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        @Override
        public Boolean isCompleted() {
            return completed;
        }

        public void setCompleted(Boolean completed) {
            this.completed = completed;
        }

        static UpdateTodoRequest withCompleted(boolean completed) {
            var result = new UpdateTodoRequest();
            result.setCompleted(completed);
            return result;
        }
    }
}
