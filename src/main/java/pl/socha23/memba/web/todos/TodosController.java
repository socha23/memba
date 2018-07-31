package pl.socha23.memba.web.todos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.socha23.memba.business.Todo;
import pl.socha23.memba.business.todos.ListTodos;
import pl.socha23.memba.web.ListResult;
import pl.socha23.memba.web.security.CurrentUserProvider;

@RestController
public class TodosController {

    private ListTodos listTodos;
    private CurrentUserProvider userProvider;

    @Autowired
    public TodosController(ListTodos listTodos, CurrentUserProvider userProvider) {
        this.listTodos = listTodos;
        this.userProvider = userProvider;
    }

    @GetMapping("/todos")
    public ListResult<Todo> listTodos() {
        return ListResult.of(listTodos.listTodos(getCurrentUserId()));
    }

    private String getCurrentUserId() {
        return userProvider.currentUser().getId();
    }

    ;
}
