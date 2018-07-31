package pl.socha23.memba.business.todos;

import pl.socha23.memba.business.Todo;

import java.util.List;

public interface TodoStore {
    List<Todo> listTodosByUserId(String userId);
}
