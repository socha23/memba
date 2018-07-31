package pl.socha23.memba.web.todos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.Todo;
import pl.socha23.memba.business.todos.TodosOperations;
import pl.socha23.memba.web.security.CurrentUserProvider;
import reactor.core.publisher.Flux;

@RestController
public class TodosController {

    private TodosOperations todosOperations;
    private CurrentUserProvider userProvider;

    @Autowired
    public TodosController(TodosOperations todosOperations, CurrentUserProvider userProvider) {
        this.todosOperations = todosOperations;
        this.userProvider = userProvider;
    }

    @GetMapping("/todos")
    public Flux<Todo> currentUserTodos() {
        return todosOperations.listTodosByUserId(getCurrentUserId());
    }

    private String getCurrentUserId() {
        return userProvider.currentUser().getId();
    }
}
